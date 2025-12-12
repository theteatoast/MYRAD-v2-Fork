import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Users, Target, Sparkles } from 'lucide-react';

const AboutPage = () => {
    const accent = '#4F46E5';

    return (
        <div style={{
            background: '#fff',
            minHeight: '100vh',
            color: '#1a1a1a',
            fontFamily: "'Inter', -apple-system, sans-serif"
        }}>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />

            {/* Header */}
            <header style={{
                borderBottom: '1px solid rgba(0,0,0,0.08)',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(20px)'
            }}>
                <div style={{
                    maxWidth: '1280px',
                    margin: '0 auto',
                    padding: '16px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span style={{
                            fontSize: '28px',
                            fontWeight: 800,
                            color: '#1a1a1a',
                            fontFamily: "'Space Grotesk', sans-serif"
                        }}>MYRAD</span>
                    </Link>
                    <Link to="/" style={{
                        color: 'rgba(0,0,0,0.5)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                </div>
            </header>

            <main style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 24px' }}>
                {/* Hero */}
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '20px',
                        background: 'rgba(79, 70, 229, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px'
                    }}>
                        <Sparkles size={40} color={accent} />
                    </div>
                    <h1 style={{
                        fontSize: '42px',
                        fontWeight: 700,
                        marginBottom: '16px',
                        fontFamily: "'Space Grotesk', sans-serif"
                    }}>
                        About <span style={{ color: accent }}>MYRAD</span>
                    </h1>
                    <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '18px' }}>
                        Building the future of user-owned data
                    </p>
                </div>

                {/* Mission */}
                <section style={{
                    background: 'rgba(255,255,255,0.8)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '20px',
                    padding: '40px',
                    marginBottom: '32px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <Target size={24} color={accent} />
                        <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>Our Mission</h2>
                    </div>
                    <p style={{ color: 'rgba(0,0,0,0.6)', lineHeight: 1.8, fontSize: '16px' }}>
                        MYRAD is building a privacy-first data network where users truly own their data.
                        We believe that personal data should benefit the people who generate it, not just
                        the corporations that collect it. Through zero-knowledge proofs and the Reclaim Protocol,
                        we enable users to contribute verified behavioral insights without exposing their
                        personal information—earning rewards while maintaining complete privacy.
                    </p>
                </section>

                {/* Vision */}
                <section style={{
                    background: 'rgba(255,255,255,0.8)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '20px',
                    padding: '40px',
                    marginBottom: '32px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <Shield size={24} color={accent} />
                        <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>The Vision</h2>
                    </div>
                    <p style={{ color: 'rgba(0,0,0,0.6)', lineHeight: 1.8, fontSize: '16px' }}>
                        We envision a world where data privacy and value creation go hand in hand.
                        Where users can safely contribute to AI development, market research, and
                        business intelligence without sacrificing their privacy. A future where the
                        $200+ billion data economy benefits everyone, not just data brokers.
                    </p>
                </section>

                {/* Values */}
                <section style={{
                    background: 'rgba(255,255,255,0.8)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '20px',
                    padding: '40px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <Users size={24} color={accent} />
                        <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>Our Values</h2>
                    </div>
                    <div style={{ display: 'grid', gap: '20px' }}>
                        {[
                            { title: 'Privacy First', desc: 'No raw data ever leaves your device. Only cryptographic proofs.' },
                            { title: 'User Ownership', desc: 'You control your data. Delete anytime, no questions asked.' },
                            { title: 'Fair Compensation', desc: 'Every contribution is rewarded. Your data, your value.' },
                            { title: 'Transparency', desc: 'Open about how we work. No hidden agendas, no data selling.' }
                        ].map((value, i) => (
                            <div key={i} style={{
                                padding: '16px',
                                background: 'rgba(79, 70, 229, 0.04)',
                                borderRadius: '12px',
                                border: '1px solid rgba(79, 70, 229, 0.1)'
                            }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: accent }}>
                                    {value.title}
                                </h3>
                                <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '14px' }}>
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer CTA */}
                <div style={{ textAlign: 'center', marginTop: '64px' }}>
                    <Link
                        to="/"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '16px 32px',
                            background: '#1a1a1a',
                            borderRadius: '12px',
                            color: '#fff',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '15px'
                        }}
                    >
                        Join the Data Union
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default AboutPage;
