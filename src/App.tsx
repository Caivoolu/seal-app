import React, { useState } from 'react';
import {
  ConnectButton,
  useCurrentAccount,
} from '@mysten/dapp-kit';
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
} from '@radix-ui/themes';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { CreateAllowlist } from './CreateAllowlist';
import { Allowlist } from './Allowlist';
import WalrusUpload from './EncryptAndUpload';
import { CreateService } from './CreateSubscriptionService';
import FeedsToSubscribe from './SubscriptionView';
import { Service } from './SubscriptionService';
import { AllAllowlist } from './OwnedAllowlists';
import { AllServices } from './OwnedSubscriptionServices';
import Feeds from './AllowlistView';

function LandingPage() {
  const cardStyle = {
    background: 'rgba(12, 100, 93, 0.4)',
    border: '1px solid rgba(1, 229, 236, 0.82)',
    padding: '2rem',
    borderRadius: '16px',
    textAlign: 'center',
    color: '#fff',
    transition: 'transform 0.3s ease',
  };

  const handleHover = (e: React.MouseEvent<HTMLDivElement>, scale: number) => {
    e.currentTarget.style.transform = `scale(${scale})`;
  };

  return (
    <Grid columns="2" gap="4">
      {[{
        title: 'Allowlist Example',
        text: 'Shows how a creator can define an allowlist based access. Only users in the allowlist have access to decrypt the files.',
        link: '/allowlist-example',
      }, {
        title: 'Subscription Example',
        text: 'Shows how a creator can define a subscription based access. Only users with a valid subscription can decrypt the files.',
        link: '/subscription-example',
      }].map(({ title, text, link }) => (
        <Card
          key={title}
          style={cardStyle as React.CSSProperties}
          onMouseEnter={(e) => handleHover(e, 1.05)}
          onMouseLeave={(e) => handleHover(e, 1)}
        >
          <Flex direction="column" gap="2" align="center">
            <div>
              <h2 style={{ color: '#00FFFF', textShadow: '0 0 10px #00FFFF' }}>{title}</h2>
              <p>{text}</p>
            </div>
            <Link to={link}>
              <Button size="3" style={{ backgroundColor: '#00FFFF', color: '#000' }}>
                Try it
              </Button>
            </Link>
          </Flex>
        </Card>
      ))}
    </Grid>
  );
}

function App() {
  const currentAccount = useCurrentAccount();
  const [recipientAllowlist, setRecipientAllowlist] = useState<string>('');
  const [capId, setCapId] = useState<string>('');

  const infoCardStyle = {
    background: 'rgba(16, 35, 36, 0.3)',
    padding: '2rem',
    borderRadius: '16px',
    border: '1px solid rgb(5, 253, 241)',
    textAlign: 'center',
    color: '#ddd',
    maxWidth: '600px',
    width: '100%',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
    transition: 'transform 0.3s ease',
  };

  const handleHover = (e: React.MouseEvent<HTMLDivElement>, scale: number) => {
    e.currentTarget.style.transform = `scale(${scale})`;
  };

  return (
    <div
      className="navi-bg"
      style={{
        padding: '2rem',
        background: 'linear-gradient(135deg,rgb(17, 212, 226) 0%,rgb(18, 98, 104) 50%,rgb(19, 56, 56) 100%)',
        minHeight: '100vh',
        transition: 'background 0.5s ease-in-out',
      }}
    >
      <Container>
        <Flex direction="column" align="center" justify="center" py="4" gap="3">
          <h1
            style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: '#00FFFF',
              textShadow: '0 0 10px #00FFFF',
              textAlign: 'center',
            }}
          >
            Seal Apps From Caivoolu
          </h1>
          <ConnectButton />
        </Flex>

        <Flex justify="center" mb="5">
          <Card
            style={{
              ...infoCardStyle,
              textAlign: 'center' as 'center',
            }}
            onMouseEnter={(e) => handleHover(e, 1.03)}
            onMouseLeave={(e) => handleHover(e, 1)}
          >
            <p style={{ marginBottom: '1rem' }}>
              1. Code is available.{' '}
              <a
                href="https://github.com/MystenLabs/seal/tree/main/examples"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#00FFFF', textDecoration: 'underline' }}
              >
                here
              </a>
            </p>
            <p style={{ marginBottom: '1rem' }}>
              2. Get testnet balance from{' '}
              <a
                href="https://faucet.sui.io/"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#00FFFF', textDecoration: 'underline' }}
              >
                faucet
              </a>
            </p>
            <p style={{ marginBottom: '1rem' }}>3. Blobs are only stored for 1 epoch.</p>
            <p>4. Only image files are supported for now. UI is demo version.</p>
          </Card>
        </Flex>

        {currentAccount ? (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/allowlist-example/*"
                element={
                  <Routes>
                    <Route path="/" element={<CreateAllowlist />} />
                    <Route
                      path="/admin/allowlist/:id"
                      element={
                        <div>
                          <Allowlist
                            setRecipientAllowlist={setRecipientAllowlist}
                            setCapId={setCapId}
                          />
                          <WalrusUpload
                            policyObject={recipientAllowlist}
                            cap_id={capId}
                            moduleName="allowlist"
                          />
                        </div>
                      }
                    />
                    <Route path="/admin/allowlists" element={<AllAllowlist />} />
                    <Route
                      path="/view/allowlist/:id"
                      element={<Feeds suiAddress={currentAccount.address} />}
                    />
                  </Routes>
                }
              />
              <Route
                path="/subscription-example/*"
                element={
                  <Routes>
                    <Route path="/" element={<CreateService />} />
                    <Route
                      path="/admin/service/:id"
                      element={
                        <div>
                          <Service
                            setRecipientAllowlist={setRecipientAllowlist}
                            setCapId={setCapId}
                          />
                          <WalrusUpload
                            policyObject={recipientAllowlist}
                            cap_id={capId}
                            moduleName="subscription"
                          />
                        </div>
                      }
                    />
                    <Route path="/admin/services" element={<AllServices />} />
                    <Route
                      path="/view/service/:id"
                      element={<FeedsToSubscribe suiAddress={currentAccount.address} />}
                    />
                  </Routes>
                }
              />
            </Routes>
          </BrowserRouter>
        ) : (
          <p style={{ textAlign: 'center', fontSize: '1rem', color: '#aaa' }}>
            Please connect your wallet to continue
          </p>
        )}
      </Container>
    </div>
  );
}

export default App;
