import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { WordlistOptions } from '@/types/wordlist';
import { 
  Settings, 
  Hash, 
  Calendar, 
  RotateCcw, 
  Shuffle,
  Key,
  Keyboard,
  Zap,
  Palette,
  Cloud
} from 'lucide-react';

interface OptionsFormProps {
  onGenerate: (options: WordlistOptions) => void;
  onBack: () => void;
}

export function OptionsForm({ onGenerate, onBack }: OptionsFormProps) {
  const [options, setOptions] = useState<WordlistOptions>({
    includeSpecialChars: true,
    includeNumbers: true,
    includeLeetSpeak: true,
    includeDates: true,
    includeReversed: true,
    includeCombinations: true,
    minLength: 6,
    maxLength: 16,
    includeCommonPasswords: true,
    includeKeyboardPatterns: true,
    includeBrandNames: true,
    includeSeasons: true,
    includeColors: true,
    includePhrases: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(options);
  };

  const updateOption = (key: keyof WordlistOptions, value: boolean | number) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="cyber-border">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-glow flex items-center gap-2">
          <Settings className="w-6 h-6 text-cyber-green" />
          Wordlist Generation Options
        </CardTitle>
        <CardDescription>
          Configure advanced options to optimize the wordlist for your specific needs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Core Options */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-cyber-green">
              <Key className="w-4 h-4" />
              Core Generation Options
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between space-x-2 p-3 rounded-lg border border-cyber-green/20">
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-cyber-red" />
                  <Label htmlFor="special-chars" className="text-sm">Special Characters (!@#$%)</Label>
                </div>
                <Switch
                  id="special-chars"
                  checked={options.includeSpecialChars}
                  onCheckedChange={(checked) => updateOption('includeSpecialChars', checked)}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 p-3 rounded-lg border border-cyber-purple/20">
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-cyber-purple" />
                  <Label htmlFor="numbers" className="text-sm">Numbers (0-9, 123, etc.)</Label>
                </div>
                <Switch
                  id="numbers"
                  checked={options.includeNumbers}
                  onCheckedChange={(checked) => updateOption('includeNumbers', checked)}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 p-3 rounded-lg border border-cyber-blue/20">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-cyber-blue" />
                  <Label htmlFor="leet" className="text-sm">Leet Speak (e→3, a→4)</Label>
                </div>
                <Switch
                  id="leet"
                  checked={options.includeLeetSpeak}
                  onCheckedChange={(checked) => updateOption('includeLeetSpeak', checked)}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 p-3 rounded-lg border border-yellow-500/20">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-yellow-400" />
                  <Label htmlFor="dates" className="text-sm">Date Combinations</Label>
                </div>
                <Switch
                  id="dates"
                  checked={options.includeDates}
                  onCheckedChange={(checked) => updateOption('includeDates', checked)}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 p-3 rounded-lg border border-green-500/20">
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-4 h-4 text-green-400" />
                  <Label htmlFor="reversed" className="text-sm">Reversed Words</Label>
                </div>
                <Switch
                  id="reversed"
                  checked={options.includeReversed}
                  onCheckedChange={(checked) => updateOption('includeReversed', checked)}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 p-3 rounded-lg border border-orange-500/20">
                <div className="flex items-center space-x-2">
                  <Shuffle className="w-4 h-4 text-orange-400" />
                  <Label htmlFor="combinations" className="text-sm">Word Combinations</Label>
                </div>
                <Switch
                  id="combinations"
                  checked={options.includeCombinations}
                  onCheckedChange={(checked) => updateOption('includeCombinations', checked)}
                />
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-cyber-purple">
              <Zap className="w-4 h-4" />
              Advanced Intelligence Options
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between space-x-2 p-3 rounded-lg border border-red-500/20">
                <div className="flex items-center space-x-2">
                  <Key className="w-4 h-4 text-red-400" />
                  <Label htmlFor="common" className="text-sm">Common Passwords</Label>
                </div>
                <Switch
                  id="common"
                  checked={options.includeCommonPasswords}
                  onCheckedChange={(checked) => updateOption('includeCommonPasswords', checked)}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 p-3 rounded-lg border border-blue-500/20">
                <div className="flex items-center space-x-2">
                  <Keyboard className="w-4 h-4 text-blue-400" />
                  <Label htmlFor="keyboard" className="text-sm">Keyboard Patterns</Label>
                </div>
                <Switch
                  id="keyboard"
                  checked={options.includeKeyboardPatterns}
                  onCheckedChange={(checked) => updateOption('includeKeyboardPatterns', checked)}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 p-3 rounded-lg border border-purple-500/20">
                <div className="flex items-center space-x-2">
                  <Cloud className="w-4 h-4 text-purple-400" />
                  <Label htmlFor="brands" className="text-sm">Brand Names</Label>
                </div>
                <Switch
                  id="brands"
                  checked={options.includeBrandNames}
                  onCheckedChange={(checked) => updateOption('includeBrandNames', checked)}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 p-3 rounded-lg border border-green-500/20">
                <div className="flex items-center space-x-2">
                  <Cloud className="w-4 h-4 text-green-400" />
                  <Label htmlFor="seasons" className="text-sm">Seasons & Weather</Label>
                </div>
                <Switch
                  id="seasons"
                  checked={options.includeSeasons}
                  onCheckedChange={(checked) => updateOption('includeSeasons', checked)}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 p-3 rounded-lg border border-pink-500/20">
                <div className="flex items-center space-x-2">
                  <Palette className="w-4 h-4 text-pink-400" />
                  <Label htmlFor="colors" className="text-sm">Colors</Label>
                </div>
                <Switch
                  id="colors"
                  checked={options.includeColors}
                  onCheckedChange={(checked) => updateOption('includeColors', checked)}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 p-3 rounded-lg border border-cyan-500/20">
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-cyan-400" />
                  <Label htmlFor="phrases" className="text-sm">Common Phrases</Label>
                </div>
                <Switch
                  id="phrases"
                  checked={options.includePhrases}
                  onCheckedChange={(checked) => updateOption('includePhrases', checked)}
                />
              </div>
            </div>
          </div>

          {/* Length Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-cyber-blue">
              <Settings className="w-4 h-4" />
              Password Length Settings
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Minimum Length: {options.minLength}</Label>
                <Slider
                  value={[options.minLength]}
                  onValueChange={([value]) => updateOption('minLength', value)}
                  max={20}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-3">
                <Label>Maximum Length: {options.maxLength}</Label>
                <Slider
                  value={[options.maxLength]}
                  onValueChange={([value]) => updateOption('maxLength', value)}
                  max={30}
                  min={options.minLength}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="bg-card/50 p-4 rounded-lg border border-cyber-red/30">
            <h3 className="font-medium text-cyber-red mb-2">⚠️ Ethical Use Warning:</h3>
            <p className="text-sm text-muted-foreground">
              This tool is for educational purposes and authorized penetration testing only. 
              Unauthorized access to computer systems is illegal. Always obtain proper permission 
              before testing passwords against any system.
            </p>
          </div>

          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
              className="cyber-border"
            >
              Back
            </Button>
            <Button 
              type="submit" 
              className="flex-1 neon-glow bg-gradient-to-r from-cyber-green to-cyber-blue hover:opacity-90 transition-all"
            >
              Generate Wordlist
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}