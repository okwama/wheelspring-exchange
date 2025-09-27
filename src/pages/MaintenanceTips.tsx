import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, Oil, Tire, Battery, Filter, SparkPlug, Calendar, DollarSign, AlertTriangle } from "lucide-react";

const MaintenanceTips = () => {
  const maintenanceSchedule = [
    {
      interval: "Every 3,000 miles",
      tasks: [
        "Oil change",
        "Oil filter replacement",
        "Tire pressure check",
        "Fluid level check"
      ],
      cost: "$50-80",
      importance: "Critical"
    },
    {
      interval: "Every 6,000 miles",
      tasks: [
        "Tire rotation",
        "Brake inspection",
        "Air filter check",
        "Battery test"
      ],
      cost: "$100-150",
      importance: "High"
    },
    {
      interval: "Every 12,000 miles",
      tasks: [
        "Transmission fluid",
        "Coolant flush",
        "Spark plugs",
        "Fuel filter"
      ],
      cost: "$200-350",
      importance: "High"
    },
    {
      interval: "Every 24,000 miles",
      tasks: [
        "Brake pad replacement",
        "Timing belt",
        "Serpentine belt",
        "Cabin air filter"
      ],
      cost: "$300-600",
      importance: "Critical"
    }
  ];

  const seasonalTips = [
    {
      season: "Spring",
      icon: "🌸",
      tasks: [
        "Check winter damage",
        "Replace wiper blades",
        "Inspect brakes",
        "Test air conditioning",
        "Clean winter salt residue"
      ],
      focus: "Recovery from winter"
    },
    {
      season: "Summer",
      icon: "☀️",
      tasks: [
        "Check coolant levels",
        "Inspect hoses",
        "Test battery",
        "Check tire pressure",
        "Clean air filters"
      ],
      focus: "Heat protection"
    },
    {
      season: "Fall",
      icon: "🍂",
      tasks: [
        "Check heating system",
        "Inspect lights",
        "Replace wiper blades",
        "Check battery",
        "Prepare for winter"
      ],
      focus: "Winter preparation"
    },
    {
      season: "Winter",
      icon: "❄️",
      tasks: [
        "Check antifreeze",
        "Inspect tires",
        "Test battery",
        "Check heating system",
        "Keep fuel tank full"
      ],
      focus: "Cold weather protection"
    }
  ];

  const diyTips = [
    {
      title: "Oil Change",
      difficulty: "Easy",
      time: "30 minutes",
      tools: ["Oil filter wrench", "Drain pan", "Funnel"],
      steps: [
        "Warm up engine for 5 minutes",
        "Jack up vehicle safely",
        "Drain old oil completely",
        "Replace oil filter",
        "Add new oil to specification",
        "Check for leaks"
      ]
    },
    {
      title: "Air Filter Replacement",
      difficulty: "Easy",
      time: "10 minutes",
      tools: ["Screwdriver"],
      steps: [
        "Locate air filter housing",
        "Remove housing cover",
        "Remove old filter",
        "Clean housing if needed",
        "Install new filter",
        "Replace cover securely"
      ]
    },
    {
      title: "Tire Pressure Check",
      difficulty: "Very Easy",
      time: "5 minutes",
      tools: ["Tire pressure gauge"],
      steps: [
        "Check when tires are cold",
        "Remove valve cap",
        "Press gauge firmly on valve",
        "Read pressure measurement",
        "Add air if needed",
        "Replace valve cap"
      ]
    },
    {
      title: "Battery Cleaning",
      difficulty: "Easy",
      time: "15 minutes",
      tools: ["Wire brush", "Baking soda", "Water"],
      steps: [
        "Disconnect battery terminals",
        "Mix baking soda with water",
        "Clean terminals and posts",
        "Rinse with clean water",
        "Dry completely",
        "Reconnect terminals"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-automotive-navy mb-4">
            Car Maintenance Tips
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Keep your vehicle running smoothly with our comprehensive maintenance guides. 
            Learn when to service, what to check, and how to do it yourself.
          </p>
        </div>

        {/* Maintenance Schedule */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-automotive-navy mb-8 text-center">
            Maintenance Schedule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {maintenanceSchedule.map((schedule, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{schedule.interval}</CardTitle>
                    <Badge className={schedule.importance === "Critical" ? "bg-red-500" : "bg-yellow-500"}>
                      {schedule.importance}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Estimated cost: {schedule.cost}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {schedule.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-center text-sm">
                        <Wrench className="h-4 w-4 text-automotive-navy mr-2" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tabs for Different Topics */}
        <Tabs defaultValue="seasonal" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
            <TabsTrigger value="diy">DIY Tips</TabsTrigger>
            <TabsTrigger value="warning">Warning Signs</TabsTrigger>
            <TabsTrigger value="costs">Cost Savings</TabsTrigger>
          </TabsList>

          {/* Seasonal Maintenance */}
          <TabsContent value="seasonal" className="mt-6">
            <h2 className="text-2xl font-bold text-automotive-navy mb-6 text-center">
              Seasonal Maintenance Guide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {seasonalTips.map((season, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">{season.icon}</div>
                    <CardTitle className="text-lg">{season.season}</CardTitle>
                    <CardDescription>{season.focus}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {season.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 text-automotive-navy mr-2" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* DIY Tips */}
          <TabsContent value="diy" className="mt-6">
            <h2 className="text-2xl font-bold text-automotive-navy mb-6 text-center">
              Do-It-Yourself Maintenance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {diyTips.map((tip, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                      <div className="flex space-x-2">
                        <Badge variant="outline">{tip.difficulty}</Badge>
                        <Badge variant="secondary">{tip.time}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Tools Needed:</h4>
                      <div className="flex flex-wrap gap-2">
                        {tip.tools.map((tool, toolIndex) => (
                          <Badge key={toolIndex} variant="outline">{tool}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Steps:</h4>
                      <ol className="space-y-1">
                        {tip.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="text-sm flex items-start">
                            <span className="font-semibold mr-2">{stepIndex + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Warning Signs */}
          <TabsContent value="warning" className="mt-6">
            <h2 className="text-2xl font-bold text-automotive-navy mb-6 text-center">
              Warning Signs to Watch For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-600">
                    <AlertTriangle className="h-6 w-6 mr-2" />
                    Immediate Attention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      Check engine light on
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      Smoke from exhaust
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      Grinding brakes
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      Overheating engine
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      Oil pressure warning
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-yellow-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-yellow-600">
                    <AlertTriangle className="h-6 w-6 mr-2" />
                    Schedule Soon
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                      Unusual noises
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                      Rough idle
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                      Poor fuel economy
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                      Vibrations while driving
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                      Fluid leaks
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Cost Savings */}
          <TabsContent value="costs" className="mt-6">
            <h2 className="text-2xl font-bold text-automotive-navy mb-6 text-center">
              Maintenance Cost Savings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-6 w-6 text-green-500 mr-2" />
                    DIY Savings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>Oil change: Save $30-50</li>
                    <li>Air filter: Save $20-40</li>
                    <li>Battery cleaning: Save $25</li>
                    <li>Wiper blades: Save $15-25</li>
                    <li>Tire pressure: Save $10</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-6 w-6 text-blue-500 mr-2" />
                    Preventive Care
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>Regular oil changes: Prevent $3,000+ engine damage</li>
                    <li>Tire rotation: Extend tire life 20%</li>
                    <li>Brake inspection: Prevent $500+ brake job</li>
                    <li>Fluid checks: Prevent $1,000+ transmission repair</li>
                    <li>Battery maintenance: Extend life 2-3 years</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wrench className="h-6 w-6 text-purple-500 mr-2" />
                    Smart Shopping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>Compare shop for services</li>
                    <li>Use quality parts, not cheapest</li>
                    <li>Follow manufacturer schedule</li>
                    <li>Keep maintenance records</li>
                    <li>Learn basic DIY skills</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="text-center py-12">
            <Wrench className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Need Professional Service?</h2>
            <p className="text-xl mb-8 text-green-100">
              Connect with certified mechanics and service centers in your area
            </p>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Find Service Centers
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default MaintenanceTips;
