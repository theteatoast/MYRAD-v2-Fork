// MVP API Routes for MYRAD
import express from 'express';
import * as jsonStorage from './jsonStorage.js';

const router = express.Router();

// Middleware to verify Privy token (stub for now)
const verifyPrivyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid authorization token' });
    }

    // For MVP, we'll extract user info from token (stub)
    // In production, verify with Privy API
    const token = authHeader.split(' ')[1];

    // STUB: For now, decode a simple token format: "privy_userId_email"
    try {
        const parts = token.split('_');
        if (parts[0] !== 'privy' || parts.length < 3) {
            return res.status(401).json({ error: 'Invalid token format' });
        }

        req.user = {
            privyId: parts[1],
            email: parts.slice(2).join('_')
        };
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Middleware to verify API key for enterprise endpoints
const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({ error: 'API key required' });
    }

    const isValid = jsonStorage.validateApiKey(apiKey);
    if (!isValid) {
        return res.status(401).json({ error: 'Invalid or inactive API key' });
    }

    next();
};

// ===================
// USER ENDPOINTS
// ===================

// Verify Privy token and get/create user
router.post('/auth/verify', verifyPrivyToken, (req, res) => {
    try {
        let user = jsonStorage.getUserByPrivyId(req.user.privyId);

        if (!user) {
            // Create new user
            user = jsonStorage.createUser(req.user.privyId, req.user.email);
        } else {
            // Update last active
            jsonStorage.updateUserActivity(user.id);
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                totalPoints: user.totalPoints || 0,
                createdAt: user.createdAt,
                lastActiveAt: user.lastActiveAt
            }
        });
    } catch (error) {
        console.error('Auth verify error:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
});

// Get user profile
router.get('/user/profile', verifyPrivyToken, (req, res) => {
    try {
        const user = jsonStorage.getUserByPrivyId(req.user.privyId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const contributions = jsonStorage.getUserContributions(user.id);

        res.json({
            success: true,
            profile: {
                id: user.id,
                email: user.email,
                totalPoints: user.totalPoints || 0,
                contributionsCount: contributions.length,
                createdAt: user.createdAt,
                lastActiveAt: user.lastActiveAt
            }
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Get user points balance and history
router.get('/user/points', verifyPrivyToken, (req, res) => {
    try {
        const user = jsonStorage.getUserByPrivyId(req.user.privyId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const pointsHistory = jsonStorage.getUserPoints(user.id);
        const totalPoints = jsonStorage.getUserTotalPoints(user.id);

        res.json({
            success: true,
            points: {
                balance: totalPoints,
                history: pointsHistory.sort((a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
                ).slice(0, 50) // Last 50 transactions
            }
        });
    } catch (error) {
        console.error('Get points error:', error);
        res.status(500).json({ error: 'Failed to fetch points' });
    }
});

// Get user contributions
router.get('/user/contributions', verifyPrivyToken, (req, res) => {
    try {
        const user = jsonStorage.getUserByPrivyId(req.user.privyId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const contributions = jsonStorage.getUserContributions(user.id);

        res.json({
            success: true,
            contributions: contributions.sort((a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            )
        });
    } catch (error) {
        console.error('Get contributions error:', error);
        res.status(500).json({ error: 'Failed to fetch contributions' });
    }
});

// Submit data contribution with enterprise data pipeline
router.post('/contribute', verifyPrivyToken, async (req, res) => {
    try {
        const user = jsonStorage.getUserByPrivyId(req.user.privyId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { anonymizedData, dataType, reclaimProofId } = req.body;

        if (!anonymizedData) {
            return res.status(400).json({ error: 'anonymizedData is required' });
        }

        let sellableData = null;
        let processedData = anonymizedData;
        let behavioralInsights = null;

        // Process Zomato and Swiggy data through enterprise pipeline
        if (dataType === 'zomato_order_history' || dataType === 'swiggy_order_history') {
            try {
                const { transformToSellableData } = await import('./llmPipeline.js');
                const provider = dataType.includes('zomato') ? 'zomato' : 'swiggy';

                console.log(`📦 Processing ${provider} data through enterprise pipeline...`);

                const result = await transformToSellableData(anonymizedData, provider, user.id);

                sellableData = result.sellableRecord;
                processedData = result.rawProcessed;
                behavioralInsights = result.geminiInsights;

                console.log('✅ Enterprise data pipeline complete');
                console.log(`📊 Generated cohort: ${sellableData.data.cohort_id}`);
            } catch (pipelineError) {
                console.error('⚠️ Pipeline error:', pipelineError.message);
            }
        }

        // Store contribution with sellable data format
        const contribution = jsonStorage.addContribution(user.id, {
            anonymizedData: processedData,
            sellableData,
            behavioralInsights,
            dataType,
            reclaimProofId,
            processingMethod: sellableData ? 'enterprise_pipeline' : 'raw'
        });

        // Update user activity
        jsonStorage.updateUserActivity(user.id);

        res.json({
            success: true,
            contribution: {
                id: contribution.id,
                pointsAwarded: 500,
                createdAt: contribution.createdAt,
                cohortId: sellableData?.data?.cohort_id || null,
                hasSellableData: !!sellableData
            },
            message: 'Contribution received! 500 points awarded.'
        });
    } catch (error) {
        console.error('Contribute error:', error);
        res.status(500).json({ error: 'Failed to submit contribution' });
    }
});

// Get leaderboard
router.get('/leaderboard', (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const leaderboard = jsonStorage.getLeaderboard(limit);

        res.json({
            success: true,
            leaderboard
        });
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

// ===================
// ENTERPRISE ENDPOINTS
// ===================

// Get sellable data in enterprise format
router.get('/enterprise/dataset', verifyApiKey, (req, res) => {
    try {
        const { platform, format = 'json', limit = 1000 } = req.query;

        const contributions = jsonStorage.getContributions();

        // Filter to only contributions with sellable data
        let sellableRecords = contributions
            .filter(c => c.sellableData)
            .map(c => c.sellableData);

        // Filter by platform if specified
        if (platform) {
            sellableRecords = sellableRecords.filter(r =>
                r.data?.transaction_summary?.platform?.includes(platform)
            );
        }

        // Apply limit
        sellableRecords = sellableRecords.slice(0, parseInt(limit));

        // Return in requested format
        if (format === 'jsonl') {
            res.setHeader('Content-Type', 'application/x-ndjson');
            res.setHeader('Content-Disposition',
                `attachment; filename="MYRAD_Dataset_${new Date().toISOString().split('T')[0]}.jsonl"`
            );
            return res.send(sellableRecords.map(r => JSON.stringify(r)).join('\n'));
        }

        res.json({
            success: true,
            dataset_info: {
                total_records: sellableRecords.length,
                platforms: [...new Set(sellableRecords.map(r => r.data?.transaction_summary?.platform))],
                generated_at: new Date().toISOString(),
                format: 'myrad_v1'
            },
            records: sellableRecords
        });
    } catch (error) {
        console.error('Enterprise dataset error:', error);
        res.status(500).json({ error: 'Failed to generate dataset' });
    }
});

// Get anonymized data (legacy endpoint)
router.get('/enterprise/data', verifyApiKey, (req, res) => {
    try {
        const { limit, offset, dataType } = req.query;

        let data = jsonStorage.getAllAnonymizedData();

        // Filter by data type if specified
        if (dataType) {
            data = data.filter(d => d.dataType === dataType);
        }

        // Pagination
        const start = parseInt(offset) || 0;
        const end = start + (parseInt(limit) || 100);
        const paginatedData = data.slice(start, end);

        res.json({
            success: true,
            data: paginatedData,
            total: data.length,
            offset: start,
            limit: end - start
        });
    } catch (error) {
        console.error('Enterprise data error:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Get aggregated insights
router.get('/enterprise/insights', verifyApiKey, (req, res) => {
    try {
        const allData = jsonStorage.getAllAnonymizedData();
        const users = jsonStorage.getUsers();
        const allPoints = jsonStorage.getPoints();

        const insights = {
            totalContributions: allData.length,
            totalUsers: users.length,
            averagePointsPerUser: users.length > 0
                ? Math.round(allPoints.reduce((sum, p) => sum + p.points, 0) / users.length)
                : 0,
            dataTypeBreakdown: {},
            recentActivity: {
                last24Hours: allData.filter(d =>
                    new Date(d.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
                ).length,
                last7Days: allData.filter(d =>
                    new Date(d.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                ).length
            }
        };

        // Calculate data type breakdown
        allData.forEach(d => {
            insights.dataTypeBreakdown[d.dataType] =
                (insights.dataTypeBreakdown[d.dataType] || 0) + 1;
        });

        res.json({
            success: true,
            insights
        });
    } catch (error) {
        console.error('Enterprise insights error:', error);
        res.status(500).json({ error: 'Failed to fetch insights' });
    }
});

// Generate API key (admin endpoint - for testing/demo)
router.post('/enterprise/keys', (req, res) => {
    try {
        const { name, adminSecret } = req.body;

        // Simple admin auth (replace with proper auth in production)
        if (adminSecret !== process.env.ADMIN_SECRET) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const apiKey = jsonStorage.generateApiKey(name);

        res.json({
            success: true,
            apiKey: {
                id: apiKey.id,
                key: apiKey.key,
                name: apiKey.name,
                createdAt: apiKey.createdAt
            },
            message: 'API key generated successfully. Store it securely - it will not be shown again.'
        });
    } catch (error) {
        console.error('Generate API key error:', error);
        res.status(500).json({ error: 'Failed to generate API key' });
    }
});

// ===================
// CONTACT FORM ENDPOINT
// ===================

// Submit contact form inquiry
router.post('/contact', (req, res) => {
    try {
        const { name, company, email, industry, message } = req.body;

        if (!name || !email || !company) {
            return res.status(400).json({ error: 'Name, company, and email are required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const inquiry = {
            id: Date.now().toString(),
            name,
            company,
            email,
            industry: industry || 'Not specified',
            message: message || '',
            createdAt: new Date().toISOString(),
            status: 'new'
        };

        // Store inquiry using jsonStorage pattern
        const fs = require('fs');
        const path = require('path');
        const INQUIRIES_FILE = path.join(__dirname, 'data', 'inquiries.json');

        let inquiries = [];
        if (fs.existsSync(INQUIRIES_FILE)) {
            try {
                inquiries = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf8'));
            } catch (e) {
                inquiries = [];
            }
        }

        inquiries.push(inquiry);
        fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));

        console.log('📬 New contact inquiry:', { name, company, email, industry });

        res.json({
            success: true,
            message: 'Your inquiry has been received. We will get back to you within 1-2 business days.',
            inquiryId: inquiry.id
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ error: 'Failed to submit inquiry' });
    }
});

export default router;

