import React, { useState } from 'react';

export default function SafeSakhiApp() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'predict' | 'detect' | 'contacts' | 'helplines'
  const [notification, setNotification] = useState(null);

  // User Profile
  const [userProfile, setUserProfile] = useState({
    name: 'Sweta Redhu',
    enrollmentNo: '08917711926',
    professor: 'Professor Dr. Mukesh',
    emergencyContacts: [
      { id: 1, name: 'Mom', phone: '+91 98765 11111', status: 'Verified' },
      { id: 2, name: 'Sister', phone: '+91 98765 22222', status: 'Verified' },
      { id: 3, name: 'Priya', phone: '+91 98765 43210', status: 'Verified ✓' }
    ]
  });

  // New Contact Form State
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [isAddingContact, setIsAddingContact] = useState(false);

  // Risk Scoring Engine State
  const [locationRisk, setLocationRisk] = useState(80); // weight 0.25
  const [timeOfDayRisk, setTimeOfDayRisk] = useState(90); // weight 0.15
  const [audioDistress, setAudioDistress] = useState(85); // weight 0.25
  const [motionPattern, setMotionPattern] = useState(70); // weight 0.15
  const [routeDeviation, setRouteDeviation] = useState(60); // weight 0.10
  const [noResponse, setNoResponse] = useState(100); // weight 0.10

  // Computed Total Risk Score
  const totalRiskScore = Math.round(
    (locationRisk * 0.25) +
    (timeOfDayRisk * 0.15) +
    (audioDistress * 0.25) +
    (motionPattern * 0.15) +
    (routeDeviation * 0.10) +
    (noResponse * 0.10)
  );

  const getRiskStatus = (score) => {
    if (score >= 70) return { label: 'HIGH RISK: Auto SOS Triggered', color: '#dc2626', bg: '#fee2e2' };
    if (score >= 40) return { label: 'CAUTION: 10s Check-in Prompt', color: '#d97706', bg: '#fef3c7' };
    return { label: 'SAFE: Continuous Monitoring', color: '#166534', bg: '#dcfce7' };
  };

  const currentRiskStatus = getRiskStatus(totalRiskScore);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newContactName || !newContactPhone) return;
    const newEntry = {
      id: Date.now(),
      name: newContactName,
      phone: newContactPhone,
      status: 'Invite sent'
    };
    setUserProfile({
      ...userProfile,
      emergencyContacts: [...userProfile.emergencyContacts, newEntry]
    });
    setNewContactName('');
    setNewContactPhone('');
    setIsAddingContact(false);
    showToast(`Consent invite sent to ${newContactName}!`);
  };

  const triggerSOS = () => {
    showToast('🚨 SOS ALERT BROADCASTED! Live GPS & Encrypted Evidence sent to 3 Contacts & Police 112.');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#2e1065', color: '#f8fafc', fontFamily: 'system-ui, sans-serif', paddingBottom: '40px' }}>
      
      {/* Toast Notification */}
      {notification && (
        <div style={{ position: 'fixed', top: '24px', right: '24px', background: '#db2777', color: '#fff', padding: '14px 22px', borderRadius: '12px', fontWeight: '800', zIndex: 1000, boxShadow: '0 10px 25px rgba(219, 39, 119, 0.4)', fontSize: '13px' }}>
          🛡️ {notification}
        </div>
      )}

      {/* Header */}
      <header style={{ borderBottom: '1px solid #4c1d95', background: '#3b0764', padding: '16px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#db2777', color: '#fff', padding: '8px 12px', borderRadius: '10px', fontWeight: '900', fontSize: '16px' }}>🛡️</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: '#f472b6', letterSpacing: '-0.5px' }}>SafeSakhi</h1>
            <p style={{ margin: 0, fontSize: '11px', color: '#cbd5e1', fontWeight: '700' }}>AI-Based Women Safety System | Sweta Redhu (08917711926)</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'dashboard', label: '📊 Risk Dashboard' },
            { id: 'predict', label: '🗺️ Safe Route Map' },
            { id: 'detect', label: '🎙️ AI Distress Sensor' },
            { id: 'contacts', label: '👥 SOS Contacts' },
            { id: 'helplines', label: '📞 Help Directory' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? '#581c87' : 'transparent',
                color: activeTab === tab.id ? '#f472b6' : '#cbd5e1',
                border: '1px solid',
                borderColor: activeTab === tab.id ? '#7e22ce' : 'transparent',
                padding: '8px 16px',
                borderRadius: '10px',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1200px', margin: '32px auto', padding: '0 24px' }}>

        {/* TAB 1: EMERGENCY RISK DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Top Status Banner */}
            <div style={{ background: 'linear-gradient(135deg, #701a75 0%, #4c1d95 100%)', color: '#fff', padding: '28px 36px', borderRadius: '20px', marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #7e22ce', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
              <div>
                <span style={{ background: currentRiskStatus.bg, color: currentRiskStatus.color, padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase' }}>
                  {currentRiskStatus.label}
                </span>
                <h2 style={{ margin: '10px 0 6px 0', fontSize: '24px', fontWeight: '900' }}>Live Danger Index: {totalRiskScore} / 100</h2>
                <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>
                  Live GPS: Active &amp; Shared | Police 112: Standing By | Encrypted Audio/Video Recording: Active
                </p>
              </div>
              <button 
                onClick={triggerSOS}
                style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '16px 28px', borderRadius: '16px', fontWeight: '900', fontSize: '16px', cursor: 'pointer', boxShadow: '0 6px 20px rgba(220, 38, 38, 0.5)', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span>🚨 MANUAL SOS</span>
              </button>
            </div>

            {/* Signal Weights Sliders & Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              
              {/* Left Column: Signal Sliders */}
              <div style={{ background: '#3b0764', border: '1px solid #581c87', padding: '28px', borderRadius: '20px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '900', color: '#f472b6' }}>Adjust AI Signal Inputs (Real-time)</h3>
                <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: '#cbd5e1' }}>Simulate real-world environment and sensor anomalies to test the decision engine.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>
                      <span>Location Risk (w: 0.25)</span>
                      <span style={{ color: '#f472b6' }}>{locationRisk}/100</span>
                    </div>
                    <input type="range" min="0" max="100" value={locationRisk} onChange={e => setLocationRisk(Number(e.target.value))} style={{ width: '100%', accentColor: '#db2777' }} />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>
                      <span>Time of Day Risk (w: 0.15)</span>
                      <span style={{ color: '#f472b6' }}>{timeOfDayRisk}/100</span>
                    </div>
                    <input type="range" min="0" max="100" value={timeOfDayRisk} onChange={e => setTimeOfDayRisk(Number(e.target.value))} style={{ width: '100%', accentColor: '#db2777' }} />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>
                      <span>Audio Distress / Scream (w: 0.25)</span>
                      <span style={{ color: '#f472b6' }}>{audioDistress}/100</span>
                    </div>
                    <input type="range" min="0" max="100" value={audioDistress} onChange={e => setAudioDistress(Number(e.target.value))} style={{ width: '100%', accentColor: '#db2777' }} />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>
                      <span>Motion Pattern / Struggle (w: 0.15)</span>
                      <span style={{ color: '#f472b6' }}>{motionPattern}/100</span>
                    </div>
                    <input type="range" min="0" max="100" value={motionPattern} onChange={e => setMotionPattern(Number(e.target.value))} style={{ width: '100%', accentColor: '#db2777' }} />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>
                      <span>Cab Route Deviation (w: 0.10)</span>
                      <span style={{ color: '#f472b6' }}>{routeDeviation}/100</span>
                    </div>
                    <input type="range" min="0" max="100" value={routeDeviation} onChange={e => setRouteDeviation(Number(e.target.value))} style={{ width: '100%', accentColor: '#db2777' }} />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>
                      <span>Check-in No-Response (w: 0.10)</span>
                      <span style={{ color: '#f472b6' }}>{noResponse}/100</span>
                    </div>
                    <input type="range" min="0" max="100" value={noResponse} onChange={e => setNoResponse(Number(e.target.value))} style={{ width: '100%', accentColor: '#db2777' }} />
                  </div>
                </div>
              </div>

              {/* Right Column: Mathematical Formula & Decision Logic */}
              <div style={{ background: '#3b0764', border: '1px solid #581c87', padding: '28px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '900', color: '#f472b6' }}>Decision Engine &amp; Formula</h3>
                  <div style={{ background: '#2e1065', padding: '16px', borderRadius: '12px', border: '1px solid #7e22ce', fontFamily: 'monospace', fontSize: '12px', lineHeight: '1.6', marginBottom: '16px', color: '#e2e8f0' }}>
                    Risk = ∑ (Weight × Signal Score)<br/>
                    = ({locationRisk}×0.25) + ({timeOfDayRisk}×0.15) + ({audioDistress}×0.25) + ({motionPattern}×0.15) + ({routeDeviation}×0.10) + ({noResponse}×0.10)<br/>
                    = {(locationRisk*0.25).toFixed(1)} + {(timeOfDayRisk*0.15).toFixed(1)} + {(audioDistress*0.25).toFixed(1)} + {(motionPattern*0.15).toFixed(1)} + {(routeDeviation*0.10).toFixed(1)} + {(noResponse*0.10).toFixed(1)}<br/>
                    = <strong style={{ color: '#f472b6' }}>{totalRiskScore} / 100</strong>
                  </div>

                  <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '800', color: '#f8fafc' }}>Automatic Threshold Rules:</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6' }}>
                    <li><strong>0 – 39 (Safe):</strong> Continuous background monitoring.</li>
                    <li><strong>40 – 69 (Caution):</strong> Triggers 10-second &quot;Are you okay?&quot; prompt.</li>
                    <li><strong>70 – 100 (Danger):</strong> Instant automatic alert to police 112 &amp; trusted contacts.</li>
                  </ul>
                </div>

                <div style={{ background: '#581c87', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: '#f472b6' }}>Nearby Volunteers</div>
                    <div style={{ fontSize: '14px', fontWeight: '900', color: '#fff' }}>2 Verified within 500m</div>
                  </div>
                  <button onClick={() => showToast('Notifying nearby verified volunteers...')} style={{ background: '#db2777', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', fontSize: '12px' }}>
                    Alert Volunteers 🤝
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: PREDICT (SAFE ROUTE MAP) */}
        {activeTab === 'predict' && (
          <div style={{ background: '#3b0764', border: '1px solid #581c87', padding: '36px', borderRadius: '20px', textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '900', color: '#f472b6' }}>Step 1: Predictive Safe Route Planning</h2>
            <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#cbd5e1' }}>SafeSakhi evaluates street lighting, historical crime data, and crowd density to recommend the safest path, not just the fastest.</p>

            <div style={{ background: '#2e1065', border: '2px dashed #7e22ce', padding: '48px', borderRadius: '16px', marginBottom: '24px', position: 'relative' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🗺️</div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800', color: '#fff' }}>Interactive Route Heatmap Active</h3>
              <p style={{ margin: '0 auto', maxWidth: '500px', fontSize: '13px', color: '#cbd5e1' }}>
                Origin: <strong style={{ color: '#4ade80' }}>IIIT Delhi Campus</strong> → Destination: <strong style={{ color: '#f472b6' }}>Govindpuri Metro Station</strong><br/>
                Selected Path: <strong style={{ color: '#4ade80' }}>Well-lit main boulevard (Risk Score: 12/100 - Safest)</strong><br/>
                Avoided Path: Dark alley short-cut (Risk Score: 88/100 - High Stalking Hazard)
              </p>
            </div>

            <button onClick={() => showToast('Safe route locked! Live deviation tracking enabled.')} style={{ background: '#db2777', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}>
              Start Navigation with SafeSakhi Guardian 🧭
            </button>
          </div>
        )}

        {/* TAB 3: DETECT (AI DISTRESS SENSOR) */}
        {activeTab === 'detect' && (
          <div style={{ background: '#3b0764', border: '1px solid #581c87', padding: '36px', borderRadius: '20px', maxWidth: '750px', margin: '0 auto' }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '900', color: '#f472b6' }}>Step 2: On-Device AI Distress Detection</h2>
            <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#cbd5e1' }}>Zero button press required. On-device models monitor audio keywords, panic tone, and accelerometer violent shakes.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              <div style={{ background: '#2e1065', padding: '20px', borderRadius: '14px', border: '1px solid #7e22ce' }}>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: '800', color: '#f472b6' }}>🎙️ Keyword &amp; Scream Spotter</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5' }}>Runs locally on-device. Privacy-first: no audio leaves your phone until an emergency is confirmed.</p>
              </div>

              <div style={{ background: '#2e1065', padding: '20px', borderRadius: '14px', border: '1px solid #7e22ce' }}>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: '800', color: '#f472b6' }}>📈 Motion &amp; LSTM Sensor</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5' }}>Detects sudden falls, violent struggles, or running through accelerometer &amp; gyroscope.</p>
              </div>
            </div>

            <div style={{ background: '#1e1b4b', padding: '20px', borderRadius: '14px', border: '1px solid #312e81', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#4ade80', marginBottom: '6px' }}>● ON-DEVICE AI LISTENING ACTIVE</div>
              <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>Say trigger words or simulate motion shake to test auto-trigger.</p>
            </div>
          </div>
        )}

        {/* TAB 4: CONTACTS (TRUSTED SOS CONTACTS) */}
        {activeTab === 'contacts' && (
          <div style={{ maxWidth: '750px', margin: '0 auto', background: '#3b0764', border: '1px solid #581c87', padding: '36px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h2 style={{ margin: '0 0 4px 0', fontSize: '22px', fontWeight: '900', color: '#f472b6' }}>My Trusted SOS Contacts</h2>
                <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1' }}>Up to 5 members alerted instantly during an emergency.</p>
              </div>
              <button 
                onClick={() => setIsAddingContact(!isAddingContact)}
                style={{ background: '#db2777', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', fontSize: '13px' }}
              >
                {isAddingContact ? 'Cancel' : '+ Add Member'}
              </button>
            </div>

            {/* Add Contact Form Modal / Drawer */}
            {isAddingContact && (
              <form onSubmit={handleAddContact} style={{ background: '#2e1065', border: '2px solid #7e22ce', padding: '24px', borderRadius: '16px', marginBottom: '24px' }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '900', color: '#fff' }}>Add Trusted SOS Member</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                  <input 
                    type="text" 
                    placeholder="Contact Name (e.g. Priya)" 
                    value={newContactName}
                    onChange={e => setNewContactName(e.target.value)}
                    style={{ padding: '12px 16px', background: '#3b0764', border: '1px solid #7e22ce', borderRadius: '10px', color: '#fff', outline: 'none', fontSize: '14px' }}
                  />
                  <input 
                    type="text" 
                    placeholder="Mobile Number (+91 ...)" 
                    value={newContactPhone}
                    onChange={e => setNewContactPhone(e.target.value)}
                    style={{ padding: '12px 16px', background: '#3b0764', border: '1px solid #7e22ce', borderRadius: '10px', color: '#fff', outline: 'none', fontSize: '14px' }}
                  />
                </div>
                <button type="submit" style={{ background: '#db2777', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: '900', cursor: 'pointer', fontSize: '14px' }}>
                  Send Consent Invite 📨
                </button>
              </form>
            )}

            {/* Contacts List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {userProfile.emergencyContacts.map((c, idx) => (
                <div key={c.id || idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#2e1065', border: '1px solid #7e22ce', padding: '18px 24px', borderRadius: '14px' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: '#cbd5e1' }}>Priority {idx + 1}</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#fff', margin: '2px 0' }}>{c.name}</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8' }}>{c.phone}</div>
                  </div>
                  <div style={{ background: c.status.includes('Verified') ? '#dcfce7' : '#fef3c7', color: c.status.includes('Verified') ? '#166534' : '#d97706', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '900' }}>
                    {c.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: HELP DIRECTORY */}
        {activeTab === 'helplines' && (
          <div style={{ maxWidth: '750px', margin: '0 auto', background: '#3b0764', border: '1px solid #581c87', padding: '36px', borderRadius: '20px' }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '22px', fontWeight: '900', color: '#f472b6' }}>Government &amp; Emergency Helplines in India</h2>
            <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: '#cbd5e1' }}>SafeSakhi connects directly to established government support systems in one tap.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { number: '112', title: 'National Emergency Response', desc: 'Police, Fire, Ambulance 24x7' },
                { number: '181', title: 'Women Helpline', desc: '24x7 support and referral' },
                { number: '1091', title: 'Women in Distress', desc: 'Direct police helpline' },
                { number: '1930', title: 'Cyber Crime Reporting', desc: 'Online abuse & financial fraud' },
                { number: '1098', title: 'Childline', desc: 'Support for girls under 18' },
                { number: 'Sakhi', title: 'One Stop Centres', desc: 'Medical, legal & police help under one roof' }
              ].map((h, i) => (
                <div key={i} style={{ background: '#2e1065', border: '1px solid #7e22ce', padding: '20px', borderRadius: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ background: '#db2777', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: '900' }}>{h.number}</span>
                    <h3 style={{ margin: '12px 0 4px 0', fontSize: '16px', fontWeight: '900', color: '#fff' }}>{h.title}</h3>
                    <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1' }}>{h.desc}</p>
                  </div>
                  <button onClick={() => showToast(`Connecting to ${h.number}...`)} style={{ marginTop: '14px', background: '#581c87', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', fontSize: '12px' }}>
                    Call Now 📞
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}