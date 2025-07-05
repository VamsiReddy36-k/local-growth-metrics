
import React, { useState } from 'react';
import BusinessForm from '@/components/BusinessForm';
import BusinessDashboard from '@/components/BusinessDashboard';
import { BusinessData } from '@/types/business';

const Index = () => {
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBusinessSubmit = async (name: string, location: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate business data response
    const mockData: BusinessData = {
      name,
      location,
      rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
      reviews: Math.floor(50 + Math.random() * 200),
      headline: generateSEOHeadline(name, location)
    };
    
    setBusinessData(mockData);
    setIsLoading(false);
  };

  const generateSEOHeadline = (name: string, location: string): string => {
    const headlines = [
      `Why ${name} is ${location}'s Best-Kept Secret in 2025`,
      `${name}: The ${location} Business Everyone's Talking About`,
      `How ${name} Became ${location}'s Top-Rated Local Favorite`,
      `${name} Dominates ${location}'s Market - Here's Why`,
      `The Rise of ${name}: ${location}'s Premier Business Success Story`,
      `${name} Sets New Standards for Excellence in ${location}`,
      `Local ${location} Gem: ${name} Exceeds All Expectations`,
      `${name}: Transforming the ${location} Business Landscape`
    ];
    return headlines[Math.floor(Math.random() * headlines.length)];
  };

  const handleRegenerateHeadline = async () => {
    if (!businessData) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newHeadline = generateSEOHeadline(businessData.name, businessData.location);
    setBusinessData({ ...businessData, headline: newHeadline });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Local Business Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your business performance with AI-powered insights and Google Business analytics
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!businessData ? (
            <BusinessForm 
              onSubmit={handleBusinessSubmit} 
              isLoading={isLoading}
            />
          ) : (
            <BusinessDashboard 
              data={businessData}
              onRegenerateHeadline={handleRegenerateHeadline}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
