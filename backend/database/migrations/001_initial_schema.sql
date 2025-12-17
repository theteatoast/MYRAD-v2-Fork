-- MYRAD Analytics Database Schema
-- This schema stores filtered, analytics-ready contribution data

-- Core contributions table
CREATE TABLE IF NOT EXISTS contributions (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    data_type VARCHAR(100) NOT NULL,
    reclaim_proof_id VARCHAR(255) UNIQUE,
    status VARCHAR(50) DEFAULT 'verified',
    processing_method VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contributions_user_id ON contributions(user_id);
CREATE INDEX IF NOT EXISTS idx_contributions_data_type ON contributions(data_type);
CREATE INDEX IF NOT EXISTS idx_contributions_created_at ON contributions(created_at);
CREATE INDEX IF NOT EXISTS idx_contributions_reclaim_proof_id ON contributions(reclaim_proof_id);

-- Analytics-ready flattened fields for fast queries
CREATE TABLE IF NOT EXISTS contribution_analytics (
    contribution_id VARCHAR(255) PRIMARY KEY REFERENCES contributions(id) ON DELETE CASCADE,
    
    -- Transaction metrics (Zomato/Swiggy)
    total_orders INTEGER,
    total_gmv DECIMAL(15, 2),
    avg_order_value DECIMAL(10, 2),
    currency VARCHAR(10),
    data_window_days INTEGER,
    data_window_start DATE,
    data_window_end DATE,
    
    -- Frequency & Behavioral metrics
    frequency_tier VARCHAR(50),
    orders_per_month DECIMAL(10, 2),
    avg_days_between_orders DECIMAL(10, 2),
    estimated_monthly_spend DECIMAL(10, 2),
    
    -- Recency metrics
    last_order_date DATE,
    days_since_last_order INTEGER,
    rfm_recency_score INTEGER,
    
    -- Lifestyle & Segment
    lifestyle_segment VARCHAR(50),
    audience_segment_id VARCHAR(255),
    
    -- Geographic data
    city_cluster VARCHAR(100),
    geo_region VARCHAR(100),
    
    -- GitHub-specific metrics
    follower_count INTEGER,
    contribution_count INTEGER,
    developer_tier VARCHAR(50),
    follower_tier VARCHAR(50),
    is_influencer BOOLEAN,
    is_active_contributor BOOLEAN,
    activity_level VARCHAR(50),
    
    -- Data quality & Compliance
    cohort_id VARCHAR(255),
    data_quality_score INTEGER,
    k_anonymity_compliant BOOLEAN,
    cohort_size INTEGER,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_cohort_id ON contribution_analytics(cohort_id);
CREATE INDEX IF NOT EXISTS idx_analytics_lifestyle_segment ON contribution_analytics(lifestyle_segment);
CREATE INDEX IF NOT EXISTS idx_analytics_frequency_tier ON contribution_analytics(frequency_tier);
CREATE INDEX IF NOT EXISTS idx_analytics_data_quality_score ON contribution_analytics(data_quality_score);
CREATE INDEX IF NOT EXISTS idx_analytics_city_cluster ON contribution_analytics(city_cluster);
CREATE INDEX IF NOT EXISTS idx_analytics_total_orders ON contribution_analytics(total_orders);
CREATE INDEX IF NOT EXISTS idx_analytics_total_gmv ON contribution_analytics(total_gmv);

-- Full sellable data stored as JSONB for flexibility
CREATE TABLE IF NOT EXISTS contribution_sellable_data (
    contribution_id VARCHAR(255) PRIMARY KEY REFERENCES contributions(id) ON DELETE CASCADE,
    sellable_data JSONB NOT NULL,
    metadata JSONB
);

-- Brand intelligence (normalized for analytics)
CREATE TABLE IF NOT EXISTS contribution_brands (
    id SERIAL PRIMARY KEY,
    contribution_id VARCHAR(255) REFERENCES contributions(id) ON DELETE CASCADE,
    brand_name VARCHAR(255) NOT NULL,
    rank INTEGER,
    order_share_pct INTEGER,
    is_chain BOOLEAN,
    category VARCHAR(100)
);

CREATE INDEX IF NOT EXISTS idx_brands_contribution_id ON contribution_brands(contribution_id);
CREATE INDEX IF NOT EXISTS idx_brands_brand_name ON contribution_brands(brand_name);
CREATE INDEX IF NOT EXISTS idx_brands_category ON contribution_brands(category);

-- Category insights (normalized for analytics)
CREATE TABLE IF NOT EXISTS contribution_categories (
    id SERIAL PRIMARY KEY,
    contribution_id VARCHAR(255) REFERENCES contributions(id) ON DELETE CASCADE,
    category_name VARCHAR(255) NOT NULL,
    order_count INTEGER,
    rank INTEGER,
    share_of_wallet VARCHAR(50),
    iab_code VARCHAR(50)
);

CREATE INDEX IF NOT EXISTS idx_categories_contribution_id ON contribution_categories(contribution_id);
CREATE INDEX IF NOT EXISTS idx_categories_category_name ON contribution_categories(category_name);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contributions_updated_at BEFORE UPDATE ON contributions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_analytics_updated_at BEFORE UPDATE ON contribution_analytics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

