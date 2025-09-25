import { useState } from 'react';
import { PersonalInfoForm } from '@/components/PersonalInfoForm';
import { SocialMediaForm } from '@/components/SocialMediaForm';
import { ReconForm } from '@/components/ReconForm';
import { OptionsForm } from '@/components/OptionsForm';
import { WordlistResults } from '@/components/WordlistResults';
import { PersonalInfo, SocialMediaInfo, ReconInfo, WordlistOptions, GeneratedWordlist } from '@/types/wordlist';
import { WordlistGenerator } from '@/utils/wordlistGenerator';
import { Progress } from '@/components/ui/progress';
import { Shield, Zap, Target, Database } from 'lucide-react';

type Step = 'personal' | 'social' | 'recon' | 'options' | 'results';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [socialMedia, setSocialMedia] = useState<SocialMediaInfo | null>(null);
  const [reconInfo, setReconInfo] = useState<ReconInfo | null>(null);
  const [wordlist, setWordlist] = useState<GeneratedWordlist | null>(null);

  const generator = new WordlistGenerator();

  const stepProgress = {
    personal: 20,
    social: 40,
    recon: 60,
    options: 80,
    results: 100
  };

  const handlePersonalInfo = (info: PersonalInfo) => {
    setPersonalInfo(info);
    setCurrentStep('social');
  };

  const handleSocialMedia = (info: SocialMediaInfo) => {
    setSocialMedia(info);
    setCurrentStep('recon');
  };

  const handleReconInfo = (info: ReconInfo) => {
    setReconInfo(info);
    setCurrentStep('options');
  };

  const handleGenerate = (options: WordlistOptions) => {
    if (personalInfo && socialMedia && reconInfo) {
      const generatedWordlist = generator.generateWordlist(
        personalInfo,
        socialMedia,
        reconInfo,
        options
      );
      setWordlist(generatedWordlist);
      setCurrentStep('results');
    }
  };

  const handleNewGeneration = () => {
    setCurrentStep('personal');
    setPersonalInfo(null);
    setSocialMedia(null);
    setReconInfo(null);
    setWordlist(null);
  };

  const getStepIcon = (step: Step) => {
    switch (step) {
      case 'personal': return Target;
      case 'social': return Zap;
      case 'recon': return Shield;
      case 'options': return Database;
      default: return Target;
    }
  };

  const steps = [
    { key: 'personal', title: 'Target Profile', icon: Target },
    { key: 'social', title: 'Social Intel', icon: Zap },
    { key: 'recon', title: 'Reconnaissance', icon: Shield },
    { key: 'options', title: 'Generation', icon: Database }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="text-center py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-glow bg-gradient-to-r from-cyber-red via-cyber-purple to-cyber-blue bg-clip-text text-transparent">
            CyberWordlist Pro
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Advanced Password Dictionary Generator with Social Media Intelligence
          </p>
          
          {/* Progress Bar */}
          {currentStep !== 'results' && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex justify-between mb-2">
                {steps.map(({ key, title, icon: Icon }) => (
                  <div key={key} className={`flex items-center gap-2 text-sm ${
                    currentStep === key ? 'text-cyber-red' : 
                    stepProgress[currentStep] > stepProgress[key as Step] ? 'text-cyber-green' : 'text-muted-foreground'
                  }`}>
                    <Icon className="w-4 h-4" />
                    <span className="hidden md:inline">{title}</span>
                  </div>
                ))}
              </div>
              <Progress 
                value={stepProgress[currentStep]} 
                className="h-2" 
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        {currentStep === 'personal' && (
          <PersonalInfoForm onNext={handlePersonalInfo} />
        )}
        
        {currentStep === 'social' && (
          <SocialMediaForm 
            onNext={handleSocialMedia} 
            onBack={() => setCurrentStep('personal')}
          />
        )}
        
        {currentStep === 'recon' && (
          <ReconForm 
            onNext={handleReconInfo} 
            onBack={() => setCurrentStep('social')}
          />
        )}
        
        {currentStep === 'options' && (
          <OptionsForm 
            onGenerate={handleGenerate} 
            onBack={() => setCurrentStep('recon')}
          />
        )}
        
        {currentStep === 'results' && wordlist && (
          <WordlistResults 
            wordlist={wordlist}
            onBack={() => setCurrentStep('options')}
            onNewGeneration={handleNewGeneration}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-cyber-red/30 mt-16 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-cyber-red" />
            <span className="text-cyber-red font-medium">Ethical Use Only</span>
          </div>
          <p>
            This tool is designed for authorized penetration testing and educational purposes only. 
            Unauthorized access to computer systems is illegal and unethical.
          </p>
          <p className="mt-2">
            Always obtain proper written permission before testing any systems you do not own.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;