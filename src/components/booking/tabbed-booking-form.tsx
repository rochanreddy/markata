"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, MapPin, Users, Plane, Car, Heart, Mountain, Home, Baby } from "lucide-react"
import { useSimpleScroll } from "@/hooks/use-simple-scroll"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  date?: Date
  onDateSelect: (date: Date | undefined) => void
  placeholder: string
  disabled?: boolean
}

function DatePicker({ date, onDateSelect, placeholder, disabled }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal transition-all duration-300 hover:border-primary focus:border-primary",
            !date && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-background" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateSelect}
          initialFocus
          disabled={(date) => date < new Date()}
        />
      </PopoverContent>
    </Popover>
  )
}

export default function TabbedBookingForm() {
  // Hotel form state
  const [hotelData, setHotelData] = useState({
    destination: "",
    checkIn: undefined as Date | undefined,
    checkOut: undefined as Date | undefined,
    guests: "2",
    rooms: "1"
  })

  // Bus form state
  const [busData, setBusData] = useState({
    from: "",
    to: "",
    departureDate: undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
    passengers: "1",
    isRoundTrip: false
  })

  // Package form state
  const [packageData, setPackageData] = useState({
    destination: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    groupSize: "2",
    packageType: ""
  })

  const [isLoading, setIsLoading] = useState(false)

  const headerAnimation = useSimpleScroll({ delay: 0, animation: 'slideUp' });
  const cardAnimation = useSimpleScroll({ delay: 200, animation: 'fadeIn' });

  const handleHotelSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log("Hotel booking:", hotelData)
    setIsLoading(false)
  }

  const handleBusSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log("Bus booking:", busData)
    setIsLoading(false)
  }

  const handlePackageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log("Package booking:", packageData)
    setIsLoading(false)
  }

  const popularDestinations = [
    "Paris, France",
    "Tokyo, Japan",
    "New York, USA",
    "London, UK",
    "Dubai, UAE",
    "Singapore",
    "Sydney, Australia",
    "Rome, Italy"
  ]

  const packageTypes = [
    { value: "romantic", label: "Romantic Getaway", icon: Heart },
    { value: "family", label: "Family Adventure", icon: Home },
    { value: "adventure", label: "Adventure Tour", icon: Mountain },
    { value: "cultural", label: "Cultural Experience", icon: Plane }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-background">
      <div 
        ref={headerAnimation.ref}
        style={headerAnimation.style}
        className="text-center mb-6 sm:mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
          Book Your Perfect Journey
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground px-4">
          Choose from hotels, bus tickets, or complete travel packages
        </p>
      </div>

      <Card 
        ref={cardAnimation.ref}
        style={cardAnimation.style}
        className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-500 hover:border-primary/20"
      >
        <CardContent className="p-4 sm:p-6">
          <Tabs defaultValue="hotels" className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6 sm:mb-8 bg-muted h-auto">
              <TabsTrigger value="hotels" className="flex items-center justify-center gap-2 py-3 px-4 transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Hotels</span>
                <span className="sm:hidden">Hotels</span>
              </TabsTrigger>
              <TabsTrigger value="bus" className="flex items-center justify-center gap-2 py-3 px-4 transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                <Car className="w-4 h-4" />
                <span className="hidden sm:inline">Bus Tickets</span>
                <span className="sm:hidden">Bus</span>
              </TabsTrigger>
              <TabsTrigger value="packages" className="flex items-center justify-center gap-2 py-3 px-4 transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                <Plane className="w-4 h-4" />
                <span className="hidden sm:inline">Travel Packages</span>
                <span className="sm:hidden">Packages</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hotels" className="mt-4 sm:mt-6">
              <form onSubmit={handleHotelSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="destination" className="text-sm font-medium">
                      Destination
                    </Label>
                    <Select
                      value={hotelData.destination}
                      onValueChange={(value) => setHotelData({ ...hotelData, destination: value })}
                    >
                      <SelectTrigger className="bg-background transition-all duration-300 hover:border-primary focus:border-primary">
                        <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {popularDestinations.map((dest) => (
                          <SelectItem key={dest} value={dest} className="hover:bg-accent transition-colors duration-200">
                            {dest}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Guests</Label>
                      <Select
                        value={hotelData.guests}
                        onValueChange={(value) => setHotelData({ ...hotelData, guests: value })}
                      >
                        <SelectTrigger className="bg-background transition-all duration-300 hover:border-primary focus:border-primary">
                          <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} Guest{num > 1 ? 's' : ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Rooms</Label>
                      <Select
                        value={hotelData.rooms}
                        onValueChange={(value) => setHotelData({ ...hotelData, rooms: value })}
                      >
                        <SelectTrigger className="bg-background transition-all duration-300 hover:border-primary focus:border-primary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          {[1, 2, 3, 4].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} Room{num > 1 ? 's' : ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Check-in Date</Label>
                    <DatePicker
                      date={hotelData.checkIn}
                      onDateSelect={(date) => setHotelData({ ...hotelData, checkIn: date })}
                      placeholder="Select check-in date"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Check-out Date</Label>
                    <DatePicker
                      date={hotelData.checkOut}
                      onDateSelect={(date) => setHotelData({ ...hotelData, checkOut: date })}
                      placeholder="Select check-out date"
                      disabled={!hotelData.checkIn}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Searching Hotels..." : "Search Hotels"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="bus" className="mt-4 sm:mt-6">
              <form onSubmit={handleBusSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="from" className="text-sm font-medium">
                      From
                    </Label>
                    <div className="relative">
                      <Input
                        id="from"
                        value={busData.from}
                        onChange={(e) => setBusData({ ...busData, from: e.target.value })}
                        placeholder="Departure city"
                        className="pl-10 bg-background transition-all duration-300 hover:border-primary focus:border-primary"
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="to" className="text-sm font-medium">
                      To
                    </Label>
                    <div className="relative">
                      <Input
                        id="to"
                        value={busData.to}
                        onChange={(e) => setBusData({ ...busData, to: e.target.value })}
                        placeholder="Destination city"
                        className="pl-10 bg-background transition-all duration-300 hover:border-primary focus:border-primary"
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="checkbox"
                    id="roundTrip"
                    checked={busData.isRoundTrip}
                    onChange={(e) => setBusData({ ...busData, isRoundTrip: e.target.checked })}
                    className="rounded border-border transition-all duration-300 hover:border-primary focus:border-primary"
                  />
                  <Label htmlFor="roundTrip" className="text-sm font-medium">
                    Round trip
                  </Label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Departure Date</Label>
                    <DatePicker
                      date={busData.departureDate}
                      onDateSelect={(date) => setBusData({ ...busData, departureDate: date })}
                      placeholder="Select departure"
                    />
                  </div>

                  {busData.isRoundTrip && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Return Date</Label>
                      <DatePicker
                        date={busData.returnDate}
                        onDateSelect={(date) => setBusData({ ...busData, returnDate: date })}
                        placeholder="Select return"
                        disabled={!busData.departureDate}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Passengers</Label>
                    <Select
                      value={busData.passengers}
                      onValueChange={(value) => setBusData({ ...busData, passengers: value })}
                    >
                      <SelectTrigger className="bg-background transition-all duration-300 hover:border-primary focus:border-primary">
                        <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} Passenger{num > 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Searching Buses..." : "Search Bus Tickets"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="packages" className="mt-4 sm:mt-6">
              <form onSubmit={handlePackageSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="package-destination" className="text-sm font-medium">
                      Destination
                    </Label>
                    <Select
                      value={packageData.destination}
                      onValueChange={(value) => setPackageData({ ...packageData, destination: value })}
                    >
                      <SelectTrigger className="bg-background transition-all duration-300 hover:border-primary focus:border-primary">
                        <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {popularDestinations.map((dest) => (
                          <SelectItem key={dest} value={dest}>
                            {dest}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Package Type</Label>
                    <Select
                      value={packageData.packageType}
                      onValueChange={(value) => setPackageData({ ...packageData, packageType: value })}
                    >
                      <SelectTrigger className="bg-background transition-all duration-300 hover:border-primary focus:border-primary">
                        <SelectValue placeholder="Select package type" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {packageTypes.map((type) => {
                          const IconComponent = type.icon
                          return (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center">
                                <IconComponent className="w-4 h-4 mr-2" />
                                {type.label}
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Start Date</Label>
                    <DatePicker
                      date={packageData.startDate}
                      onDateSelect={(date) => setPackageData({ ...packageData, startDate: date })}
                      placeholder="Select start date"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">End Date</Label>
                    <DatePicker
                      date={packageData.endDate}
                      onDateSelect={(date) => setPackageData({ ...packageData, endDate: date })}
                      placeholder="Select end date"
                      disabled={!packageData.startDate}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Group Size</Label>
                    <Select
                      value={packageData.groupSize}
                      onValueChange={(value) => setPackageData({ ...packageData, groupSize: value })}
                    >
                      <SelectTrigger className="bg-background transition-all duration-300 hover:border-primary focus:border-primary">
                        <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} Person{num > 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Finding Packages..." : "Find Travel Packages"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}