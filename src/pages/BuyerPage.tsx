import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Lock, Database, CheckCircle, BarChart3, Zap } from 'lucide-react';

const BuyerPage = () => {
    const features = [
        {
            icon: Shield,
            title: 'Privacy-First Data',
            description: 'All data is anonymized on-device using zero-knowledge proofs. No PII ever touches our servers.'
        },
        {
            icon: CheckCircle,
            title: 'User-Consented',
            description: '100% opt-in data contributions. Users actively choose to share insights for rewards.'
        },
        {
            icon: BarChart3,
            title: 'Behavioral Insights',
            description: 'Access pre-labeled traits and cohorts like "Daily Delivery Users" or "High Spend Eaters".'
        },
        {
            icon: Lock,
            title: 'GDPR & CCPA Compliant',
            description: 'Built for compliance from day one. Cookie-proof by design.'
        }
    ];

    const useCases = [
        'AI Model Training',
        'Audience Segmentation',
        'Market Research',
        'Consumer Behavior Analysis',
        'Trend Prediction',
        'Personalization Engines'
    ];

    return (
        <div style={{
            background: '#fff',
            minHeight: '100vh',
            color: '#1a1a1a',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />

            <style>{`
                * { font-family: 'Inter', -apple-system, sans-serif; }
                h1, h2, h3 { font-family: 'Space Grotesk', sans-serif; }
                
                .card {
                    background: rgba(255,255,255,0.8);
                    border: 1px solid rgba(0,0,0,0.08);
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.04);
                }
                .card:hover {
                    background: rgba(255,255,255,0.95);
                    border-color: rgba(0,0,0,0.12);
                    transform: translateY(-6px);
                    box-shadow: 0 12px 40px rgba(0,0,0,0.08);
                }
                
                .btn-primary {
                    background: #1a1a1a;
                    border: none;
                    color: #fff;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
                }
                
                .nav-link {
                    color: rgba(0,0,0,0.5);
                    text-decoration: none;
                    font-size: 14px;
                    transition: color 0.2s;
                }
                .nav-link:hover { color: #1a1a1a; }
            `}</style>

            {/* Header */}
            <header style={{
                borderBottom: '1px solid rgba(0,0,0,0.08)',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(20px)',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div style={{
                    maxWidth: '1280px',
                    margin: '0 auto',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span style={{
                            fontSize: '24px',
                            fontWeight: 800,
                            color: '#1a1a1a',
                            fontFamily: "'Space Grotesk', sans-serif"
                        }}>MYRAD</span>
                    </Link>
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <Link to="/" className="nav-link">For Users</Link>
                        <Link to="/buyers" style={{ color: '#1a1a1a', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>For Buyers</Link>
                        <Link to="/contact" className="btn-primary" style={{ padding: '12px 24px', borderRadius: '10px', textDecoration: 'none', fontSize: '14px' }}>
                            Get Access
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section style={{
                padding: '140px 24px 100px',
                textAlign: 'center',
                position: 'relative',
                borderBottom: '1px solid rgba(0,0,0,0.06)'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {/* Badge */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        background: 'rgba(79, 70, 229, 0.08)',
                        border: '1px solid rgba(79, 70, 229, 0.15)',
                        borderRadius: '100px',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#4F46E5',
                        marginBottom: '32px'
                    }}>
                        <Database size={14} />
                        Enterprise Data Solutions
                    </div>

                    {/* Headline */}
                    <h1 style={{
                        fontSize: 'clamp(40px, 6vw, 60px)',
                        fontWeight: 700,
                        lineHeight: 1.1,
                        marginBottom: '24px',
                        letterSpacing: '-0.03em',
                        color: '#1a1a1a'
                    }}>
                        The Future of Behavioral Intelligence is Compliant.
                    </h1>

                    {/* Sub-headline */}
                    <p style={{
                        fontSize: 'clamp(16px, 2vw, 18px)',
                        color: 'rgba(0,0,0,0.5)',
                        lineHeight: 1.7,
                        maxWidth: '650px',
                        margin: '0 auto 48px'
                    }}>
                        Access high-quality, anonymous, and user-consented data for your AI models and audience segmentation. Cookie-proof by design.
                    </p>

                    {/* CTA */}
                    <Link
                        to="/contact"
                        className="btn-primary"
                        style={{
                            padding: '18px 40px',
                            borderRadius: '12px',
                            fontSize: '16px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            textDecoration: 'none'
                        }}
                    >
                        Inquire About Data Access
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            {/* Value Proposition */}
            <section style={{
                padding: '100px 24px',
                borderBottom: '1px solid rgba(0,0,0,0.06)'
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div className="card" style={{
                        borderRadius: '24px',
                        padding: '48px',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '20px', color: '#1a1a1a' }}>
                            What We Provide
                        </h2>
                        <p style={{ color: 'rgba(0,0,0,0.5)', lineHeight: 1.8, fontSize: '16px' }}>
                            We provide essential, pre-labeled behavioral traits and cohorts (e.g., <strong style={{ color: '#1a1a1a' }}>Daily Delivery Users</strong> or{' '}
                            <strong style={{ color: '#1a1a1a' }}>High Spend Eaters</strong>) that traditional data brokers cannot.
                            Our data is 100% compliant, sourced directly from users via zero-knowledge proofs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '100px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <p style={{ fontSize: '13px', fontWeight: 600, color: '#4F46E5', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            Why Choose Us
                        </p>
                        <h2 style={{
                            fontSize: '40px',
                            fontWeight: 700,
                            color: '#1a1a1a'
                        }}>
                            Why MYRAD Data?
                        </h2>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '20px'
                    }}>
                        {features.map((feature, i) => (
                            <div key={i} className="card" style={{ borderRadius: '20px', padding: '36px' }}>
                                <div style={{
                                    width: '52px',
                                    height: '52px',
                                    borderRadius: '14px',
                                    background: 'rgba(79, 70, 229, 0.08)',
                                    border: '1px solid rgba(79, 70, 229, 0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '24px'
                                }}>
                                    <feature.icon size={24} color="#4F46E5" />
                                </div>
                                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#1a1a1a' }}>
                                    {feature.title}
                                </h3>
                                <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '14px', lineHeight: 1.7 }}>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section style={{
                padding: '100px 24px',
                borderBottom: '1px solid rgba(0,0,0,0.06)'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#4F46E5', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        Applications
                    </p>
                    <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px', color: '#1a1a1a' }}>
                        Ideal For
                    </h2>
                    <p style={{ color: 'rgba(0,0,0,0.5)', marginBottom: '48px' }}>
                        Power your data-driven initiatives with compliant behavioral intelligence
                    </p>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px',
                        justifyContent: 'center'
                    }}>
                        {useCases.map((useCase, i) => (
                            <div key={i} style={{
                                padding: '12px 24px',
                                background: 'rgba(79, 70, 229, 0.08)',
                                border: '1px solid rgba(79, 70, 229, 0.15)',
                                borderRadius: '100px',
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#4F46E5'
                            }}>
                                {useCase}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Coming Soon Notice */}
            <section style={{ padding: '100px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                    <div className="card" style={{
                        borderRadius: '20px',
                        padding: '40px'
                    }}>
                        <Zap size={32} color="#4F46E5" style={{ marginBottom: '16px' }} />
                        <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '12px', color: '#1a1a1a' }}>
                            Coming Soon
                        </h3>
                        <p style={{ color: 'rgba(0,0,0,0.5)', lineHeight: 1.7 }}>
                            The full <strong style={{ color: '#1a1a1a' }}>Insight Marketplace</strong> and <strong style={{ color: '#1a1a1a' }}>Trait API</strong> access are coming soon.
                            For immediate access and pilot programs, please contact our team.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: '140px 24px',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '44px', fontWeight: 700, marginBottom: '20px', color: '#1a1a1a' }}>
                        Ready to Get Started?
                    </h2>
                    <p style={{ color: 'rgba(0,0,0,0.5)', marginBottom: '40px', fontSize: '17px', lineHeight: 1.7 }}>
                        Contact us to learn more about accessing compliant behavioral data for your organization.
                    </p>
                    <Link
                        to="/contact"
                        className="btn-primary"
                        style={{
                            padding: '20px 48px',
                            borderRadius: '14px',
                            fontSize: '17px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            textDecoration: 'none'
                        }}
                    >
                        Inquire About Data Access
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                padding: '48px 24px',
                borderTop: '1px solid rgba(0,0,0,0.08)'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '24px'
                }}>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: '#1a1a1a', fontFamily: "'Space Grotesk', sans-serif" }}>MYRAD</div>
                    <nav style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
                        <Link to="/" className="nav-link">For Users</Link>
                        <Link to="/privacy" className="nav-link">Privacy</Link>
                        <Link to="/terms" className="nav-link">Terms</Link>
                    </nav>
                </div>
                <div style={{
                    maxWidth: '1200px',
                    margin: '24px auto 0',
                    paddingTop: '24px',
                    borderTop: '1px solid rgba(0,0,0,0.08)',
                    textAlign: 'center',
                    color: 'rgba(0,0,0,0.4)',
                    fontSize: '13px'
                }}>
                    © 2024 MYRAD Labs. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default BuyerPage;
