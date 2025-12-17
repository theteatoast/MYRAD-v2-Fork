-- Separate tables for Zomato and GitHub contributions
-- This replaces the unified schema with data-type-specific tables

-- Zomato Contributions Table
CREATE TABLE IF NOT EXISTS zomato_contributions (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    reclaim_proof_id VARCHAR(255) UNIQUE,
    status VARCHAR(50) DEFAULT 'verified',
    processing_method VARCHAR(100),
    
    -- Core contribution metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Full sellable data stored as JSONB (all details preserved)
    sellable_data JSONB NOT NULL,
    
    -- Additional metadata if needed
    metadata JSONB,
    
    -- Indexed fields for fast filtering/querying
    total_orders INTEGER,
    total_gmv DECIMAL(15, 2),
    avg_order_value DECIMAL(10, 2),
    frequency_tier VARCHAR(50),
    lifestyle_segment VARCHAR(50),
    city_cluster VARCHAR(100),
    data_quality_score INTEGER,
    cohort_id VARCHAR(255)
);

CREATE INDEX IF NOT EXISTS idx_zomato_user_id ON zomato_contributions(user_id);
CREATE INDEX IF NOT EXISTS idx_zomato_created_at ON zomato_contributions(created_at);
CREATE INDEX IF NOT EXISTS idx_zomato_reclaim_proof_id ON zomato_contributions(reclaim_proof_id);
CREATE INDEX IF NOT EXISTS idx_zomato_total_orders ON zomato_contributions(total_orders);
CREATE INDEX IF NOT EXISTS idx_zomato_total_gmv ON zomato_contributions(total_gmv);
CREATE INDEX IF NOT EXISTS idx_zomato_frequency_tier ON zomato_contributions(frequency_tier);
CREATE INDEX IF NOT EXISTS idx_zomato_lifestyle_segment ON zomato_contributions(lifestyle_segment);
CREATE INDEX IF NOT EXISTS idx_zomato_city_cluster ON zomato_contributions(city_cluster);
CREATE INDEX IF NOT EXISTS idx_zomato_cohort_id ON zomato_contributions(cohort_id);

-- GitHub Contributions Table
CREATE TABLE IF NOT EXISTS github_contributions (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    reclaim_proof_id VARCHAR(255) UNIQUE,
    status VARCHAR(50) DEFAULT 'verified',
    processing_method VARCHAR(100),
    
    -- Core contribution metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Full sellable data stored as JSONB (all details preserved)
    sellable_data JSONB NOT NULL,
    
    -- Additional metadata if needed
    metadata JSONB,
    
    -- Indexed fields for fast filtering/querying
    follower_count INTEGER,
    contribution_count INTEGER,
    developer_tier VARCHAR(50),
    follower_tier VARCHAR(50),
    activity_level VARCHAR(50),
    is_influencer BOOLEAN,
    is_active_contributor BOOLEAN,
    data_quality_score INTEGER,
    cohort_id VARCHAR(255)
);

CREATE INDEX IF NOT EXISTS idx_github_user_id ON github_contributions(user_id);
CREATE INDEX IF NOT EXISTS idx_github_created_at ON github_contributions(created_at);
CREATE INDEX IF NOT EXISTS idx_github_reclaim_proof_id ON github_contributions(reclaim_proof_id);
CREATE INDEX IF NOT EXISTS idx_github_follower_count ON github_contributions(follower_count);
CREATE INDEX IF NOT EXISTS idx_github_contribution_count ON github_contributions(contribution_count);
CREATE INDEX IF NOT EXISTS idx_github_developer_tier ON github_contributions(developer_tier);
CREATE INDEX IF NOT EXISTS idx_github_cohort_id ON github_contributions(cohort_id);

-- Update timestamp trigger for Zomato (DROP first if exists, then CREATE)
DROP TRIGGER IF EXISTS update_zomato_updated_at ON zomato_contributions;
CREATE TRIGGER update_zomato_updated_at BEFORE UPDATE ON zomato_contributions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update timestamp trigger for GitHub (DROP first if exists, then CREATE)
DROP TRIGGER IF EXISTS update_github_updated_at ON github_contributions;
CREATE TRIGGER update_github_updated_at BEFORE UPDATE ON github_contributions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
