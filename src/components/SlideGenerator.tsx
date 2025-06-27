import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Palette, Building, Upload, File, X } from 'lucide-react';
import { Meeting, Board, SlideTemplate } from '../types/boardTypes';

interface SlideGeneratorProps {
  board: Board;
  meeting: Meeting;
  onClose: () => void;
}

interface BrandingTemplate {
  companyName: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  fontFamily: string;
  footerText: string;
}

interface UploadedTemplate {
  file: File;
  name: string;
  uploadedAt: Date;
}

const SlideGenerator: React.FC<SlideGeneratorProps> = ({ board, meeting, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('standard');
  const [slidesGenerated, setSlidesGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showBrandingConfig, setShowBrandingConfig] = useState(false);
  const [uploadedTemplate, setUploadedTemplate] = useState<UploadedTemplate | null>(null);
  
  const [brandingTemplate, setBrandingTemplate] = useState<BrandingTemplate>({
    companyName: 'Your Company',
    primaryColor: '#1e40af',
    secondaryColor: '#64748b',
    logoUrl: '',
    fontFamily: 'Arial',
    footerText: 'Confidential - Board Meeting Materials'
  });

  const standardTemplate: SlideTemplate = {
    id: 'standard',
    name: 'Standard Board PowerPoint Template',
    slides: [
      {
        title: 'Title Slide',
        content: `${board.name}\nMeeting Date: ${new Date(meeting.date).toLocaleDateString()}\nChairperson: ${meeting.chairperson}`,
        type: 'title'
      },
      {
        title: 'Agenda Overview',
        content: meeting.agenda
          .sort((a, b) => a.order - b.order)
          .map((item, index) => `${index + 1}. ${item.title} (${item.duration} min)`)
          .join('\n'),
        type: 'agenda'
      },
      ...meeting.agenda
        .filter(item => item.type === 'decision')
        .map(item => ({
          title: `Decision: ${item.title}`,
          content: `Presenter: ${item.presenter}\nDescription: ${item.description}\n${item.escalatedFrom ? `Escalated from: ${item.escalatedFrom}` : ''}`,
          type: 'decision' as const
        })),
      {
        title: 'Next Steps & Actions',
        content: 'Action items and follow-ups will be documented here during the meeting.',
        type: 'conclusion'
      }
    ]
  };

  const handleTemplateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || file.name.endsWith('.pptx'))) {
      setUploadedTemplate({
        file,
        name: file.name,
        uploadedAt: new Date()
      });
      console.log('PowerPoint template uploaded:', file.name);
    } else {
      console.error('Please upload a valid PowerPoint (.pptx) file');
    }
  };

  const removeUploadedTemplate = () => {
    setUploadedTemplate(null);
  };

  const handleBrandingChange = (field: keyof BrandingTemplate, value: string) => {
    setBrandingTemplate(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePowerPointSlides = async () => {
    setIsGenerating(true);
    try {
      // Simulate PowerPoint generation process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Generating PowerPoint presentation with template:', selectedTemplate);
      if (uploadedTemplate) {
        console.log('Using uploaded template:', uploadedTemplate.name);
      } else {
        console.log('Using manual branding configuration:', brandingTemplate);
      }
      console.log('Slides data:', standardTemplate.slides);
      
      // In a real implementation, this would:
      // 1. Use the uploaded .pptx template if available
      // 2. Apply the meeting content to the template slides
      // 3. Generate downloadable .pptx file with preserved branding
      
      setSlidesGenerated(true);
    } catch (error) {
      console.error('Error generating PowerPoint:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPowerPoint = () => {
    // In a real implementation, this would download the actual .pptx file
    console.log('Downloading PowerPoint presentation with branding:', brandingTemplate);
    
    // Simulate file download
    const link = document.createElement('a');
    link.href = '#'; // Would be the actual file blob URL
    link.download = `${board.name}_Meeting_${new Date(meeting.date).toISOString().split('T')[0]}.pptx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const previewSlide = (slideIndex: number) => {
    console.log('Previewing PowerPoint slide:', slideIndex);
  };

  return (
    <Card className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">PowerPoint Slides Generator</h3>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>

      <div className="mb-6">
        <Badge variant="outline" className="mb-4">
          <FileText className="h-3 w-3 mr-1" />
          Auto-generated PowerPoint for {board.name}
        </Badge>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">PowerPoint Template Selection</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="template"
                  value="standard"
                  checked={selectedTemplate === 'standard'}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="mr-2"
                />
                Standard Board PowerPoint Template
              </label>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Meeting Information</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Date: {new Date(meeting.date).toLocaleDateString()}</p>
              <p>Agenda Items: {meeting.agenda.length}</p>
              <p>Total Duration: {meeting.agenda.reduce((sum, item) => sum + item.duration, 0)} minutes</p>
              <p>Output Format: Microsoft PowerPoint (.pptx)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Template Upload Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            Company PowerPoint Template
          </h4>
        </div>

        <div className="border rounded-lg p-4 bg-gray-50">
          {!uploadedTemplate ? (
            <div className="text-center py-6">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-3">
                Upload your company's PowerPoint template (.pptx) to automatically apply your branding
              </p>
              <div className="flex justify-center">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    onChange={handleTemplateUpload}
                    className="hidden"
                  />
                  <Button variant="outline" className="flex items-center">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload PowerPoint Template
                  </Button>
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Supported format: PowerPoint (.pptx) files only
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded">
                  <File className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">{uploadedTemplate.name}</p>
                  <p className="text-xs text-gray-500">
                    Uploaded {uploadedTemplate.uploadedAt.toLocaleString()}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={removeUploadedTemplate}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-3 w-3 mr-1" />
                Remove
              </Button>
            </div>
          )}
        </div>

        {uploadedTemplate && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">
              Your company template will be used for slide generation. Colors, fonts, and branding from your template will be automatically applied.
            </p>
          </div>
        )}
      </div>

      {/* Company Branding Configuration Section - only show if no template uploaded */}
      {!uploadedTemplate && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium flex items-center">
              <Building className="h-4 w-4 mr-2" />
              Manual Branding Configuration
            </h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBrandingConfig(!showBrandingConfig)}
            >
              <Palette className="h-3 w-3 mr-1" />
              {showBrandingConfig ? 'Hide' : 'Configure'} Branding
            </Button>
          </div>

          {showBrandingConfig && (
            <div className="border rounded-lg p-4 bg-gray-50 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Company Name</label>
                  <input
                    type="text"
                    value={brandingTemplate.companyName}
                    onChange={(e) => handleBrandingChange('companyName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Your Company Name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Font Family</label>
                  <select
                    value={brandingTemplate.fontFamily}
                    onChange={(e) => handleBrandingChange('fontFamily', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Calibri">Calibri</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Helvetica">Helvetica</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Primary Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={brandingTemplate.primaryColor}
                      onChange={(e) => handleBrandingChange('primaryColor', e.target.value)}
                      className="w-12 h-8 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={brandingTemplate.primaryColor}
                      onChange={(e) => handleBrandingChange('primaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="#1e40af"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Secondary Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={brandingTemplate.secondaryColor}
                      onChange={(e) => handleBrandingChange('secondaryColor', e.target.value)}
                      className="w-12 h-8 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={brandingTemplate.secondaryColor}
                      onChange={(e) => handleBrandingChange('secondaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="#64748b"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Company Logo URL</label>
                  <input
                    type="url"
                    value={brandingTemplate.logoUrl}
                    onChange={(e) => handleBrandingChange('logoUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Footer Text</label>
                  <input
                    type="text"
                    value={brandingTemplate.footerText}
                    onChange={(e) => handleBrandingChange('footerText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Confidential - Board Meeting Materials"
                  />
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-gray-600">
                  These branding settings will be applied to all generated PowerPoint slides including headers, footers, and color schemes.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mb-6">
        <h4 className="font-medium mb-3">PowerPoint Slide Preview</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {standardTemplate.slides.map((slide, index) => (
            <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-sm">{slide.title}</h5>
                <Badge variant="outline" className="text-xs">
                  {slide.type}
                </Badge>
              </div>
              <div className="text-xs text-gray-600 whitespace-pre-wrap">
                {slide.content.substring(0, 100)}
                {slide.content.length > 100 ? '...' : ''}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full"
                onClick={() => previewSlide(index)}
              >
                <Eye className="h-3 w-3 mr-1" />
                Preview Slide
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-2">
        <Button 
          onClick={generatePowerPointSlides}
          disabled={isGenerating}
        >
          <FileText className="h-4 w-4 mr-2" />
          {isGenerating ? 'Generating PowerPoint...' : 'Generate PowerPoint Slides'}
        </Button>
        {slidesGenerated && (
          <Button variant="outline" onClick={downloadPowerPoint}>
            <Download className="h-4 w-4 mr-2" />
            Download PowerPoint (.pptx)
          </Button>
        )}
      </div>

      {slidesGenerated && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">
            PowerPoint presentation generated successfully {uploadedTemplate ? 'using your company template' : 'with your company branding'}! You can now download the .pptx file with {standardTemplate.slides.length} slides.
          </p>
        </div>
      )}

      {isGenerating && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            Creating PowerPoint presentation with your meeting agenda, board template, and company branding...
          </p>
        </div>
      )}
    </Card>
  );
};

export default SlideGenerator;
