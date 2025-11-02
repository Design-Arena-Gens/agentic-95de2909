'use client'

import { useState, useEffect } from 'react'
import {
  Heart,
  Stethoscope,
  Syringe,
  Truck,
  MapPin,
  Clock,
  Star,
  User,
  Calendar,
  CreditCard,
  Search,
  ChevronRight,
  Activity
} from 'lucide-react'

type ServiceType = 'doctor' | 'nurse' | 'therapist' | 'ambulance' | 'lab' | 'pharmacy'

interface Provider {
  id: string
  name: string
  specialty: string
  rating: number
  distance: string
  eta: string
  price: number
  avatar: string
  completedVisits: number
}

interface Booking {
  id: string
  provider: Provider
  service: ServiceType
  status: 'pending' | 'accepted' | 'arriving' | 'in-progress' | 'completed'
  scheduledTime: string
  location: string
}

export default function Home() {
  const [view, setView] = useState<'home' | 'booking' | 'tracking' | 'profile'>('home')
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null)
  const [location, setLocation] = useState('123 Main St, San Francisco, CA')
  const [searchingProviders, setSearchingProviders] = useState(false)
  const [availableProviders, setAvailableProviders] = useState<Provider[]>([])
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null)
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([])

  const services = [
    { id: 'doctor' as ServiceType, name: 'Doctor Visit', icon: Stethoscope, color: 'bg-blue-500' },
    { id: 'nurse' as ServiceType, name: 'Nurse Care', icon: Heart, color: 'bg-pink-500' },
    { id: 'therapist' as ServiceType, name: 'Therapist', icon: User, color: 'bg-purple-500' },
    { id: 'ambulance' as ServiceType, name: 'Ambulance', icon: Truck, color: 'bg-red-500' },
    { id: 'lab' as ServiceType, name: 'Lab Test', icon: Syringe, color: 'bg-green-500' },
    { id: 'pharmacy' as ServiceType, name: 'Pharmacy', icon: Activity, color: 'bg-orange-500' },
  ]

  const mockProviders: Record<ServiceType, Provider[]> = {
    doctor: [
      { id: '1', name: 'Dr. Sarah Johnson', specialty: 'General Practitioner', rating: 4.9, distance: '0.8 mi', eta: '12 min', price: 120, avatar: '👩‍⚕️', completedVisits: 1247 },
      { id: '2', name: 'Dr. Michael Chen', specialty: 'Family Medicine', rating: 4.8, distance: '1.2 mi', eta: '15 min', price: 110, avatar: '👨‍⚕️', completedVisits: 892 },
      { id: '3', name: 'Dr. Emily Rodriguez', specialty: 'Internal Medicine', rating: 4.9, distance: '1.5 mi', eta: '18 min', price: 130, avatar: '👩‍⚕️', completedVisits: 1456 },
    ],
    nurse: [
      { id: '4', name: 'Nurse Lisa Anderson', specialty: 'Registered Nurse', rating: 4.9, distance: '0.5 mi', eta: '8 min', price: 80, avatar: '👩‍⚕️', completedVisits: 2103 },
      { id: '5', name: 'Nurse James Wilson', specialty: 'Critical Care', rating: 4.7, distance: '0.9 mi', eta: '11 min', price: 85, avatar: '👨‍⚕️', completedVisits: 1678 },
    ],
    therapist: [
      { id: '6', name: 'Dr. Amanda White', specialty: 'Physical Therapy', rating: 4.8, distance: '1.0 mi', eta: '14 min', price: 100, avatar: '👩‍⚕️', completedVisits: 934 },
      { id: '7', name: 'Dr. Robert Brown', specialty: 'Mental Health', rating: 4.9, distance: '1.3 mi', eta: '16 min', price: 150, avatar: '👨‍⚕️', completedVisits: 1123 },
    ],
    ambulance: [
      { id: '8', name: 'Emergency Unit A', specialty: 'Emergency Transport', rating: 5.0, distance: '0.3 mi', eta: '5 min', price: 500, avatar: '🚑', completedVisits: 3421 },
      { id: '9', name: 'Emergency Unit B', specialty: 'Critical Care Transport', rating: 4.9, distance: '0.7 mi', eta: '7 min', price: 550, avatar: '🚑', completedVisits: 2987 },
    ],
    lab: [
      { id: '10', name: 'QuickLab Mobile', specialty: 'Blood Work & Tests', rating: 4.8, distance: '0.6 mi', eta: '10 min', price: 60, avatar: '🔬', completedVisits: 1834 },
      { id: '11', name: 'FastTest Services', specialty: 'Diagnostic Testing', rating: 4.7, distance: '1.1 mi', eta: '13 min', price: 65, avatar: '🔬', completedVisits: 1567 },
    ],
    pharmacy: [
      { id: '12', name: 'RxExpress Delivery', specialty: 'Prescription Delivery', rating: 4.9, distance: '0.4 mi', eta: '9 min', price: 15, avatar: '💊', completedVisits: 4523 },
      { id: '13', name: 'MedFast Courier', specialty: 'Medication Delivery', rating: 4.8, distance: '0.8 mi', eta: '12 min', price: 12, avatar: '💊', completedVisits: 3890 },
    ],
  }

  const searchProviders = (serviceType: ServiceType) => {
    setSelectedService(serviceType)
    setSearchingProviders(true)
    setView('booking')

    setTimeout(() => {
      setAvailableProviders(mockProviders[serviceType])
      setSearchingProviders(false)
    }, 2000)
  }

  const bookProvider = (provider: Provider) => {
    const booking: Booking = {
      id: Date.now().toString(),
      provider,
      service: selectedService!,
      status: 'pending',
      scheduledTime: new Date(Date.now() + 15 * 60000).toISOString(),
      location,
    }

    setCurrentBooking(booking)
    setView('tracking')

    // Simulate booking flow
    setTimeout(() => {
      setCurrentBooking(prev => prev ? { ...prev, status: 'accepted' } : null)
    }, 3000)

    setTimeout(() => {
      setCurrentBooking(prev => prev ? { ...prev, status: 'arriving' } : null)
    }, 6000)

    setTimeout(() => {
      setCurrentBooking(prev => prev ? { ...prev, status: 'in-progress' } : null)
    }, 12000)
  }

  const completeBooking = () => {
    if (currentBooking) {
      const completedBooking = { ...currentBooking, status: 'completed' as const }
      setBookingHistory(prev => [completedBooking, ...prev])
      setCurrentBooking(null)
      setSelectedService(null)
      setAvailableProviders([])
      setView('home')
    }
  }

  const getStatusMessage = (status: Booking['status']) => {
    const messages = {
      pending: 'Finding your provider...',
      accepted: 'Provider confirmed! Preparing to arrive',
      arriving: 'Provider is on the way',
      'in-progress': 'Appointment in progress',
      completed: 'Appointment completed'
    }
    return messages[status]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">HealthRide</h1>
          </div>
          <nav className="flex gap-6">
            <button
              onClick={() => setView('home')}
              className={`flex items-center gap-2 ${view === 'home' ? 'text-primary' : 'text-gray-600'}`}
            >
              <Heart className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </button>
            <button
              onClick={() => setView('profile')}
              className={`flex items-center gap-2 ${view === 'profile' ? 'text-primary' : 'text-gray-600'}`}
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">Profile</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Home View */}
        {view === 'home' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-4">Healthcare When You Need It</h2>
              <p className="text-lg mb-6">Book qualified healthcare professionals to come to you in minutes</p>
              <div className="flex items-center gap-2 bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                <MapPin className="w-5 h-5" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 text-white placeholder-white/70"
                  placeholder="Enter your location"
                />
              </div>
            </div>

            {/* Active Booking Alert */}
            {currentBooking && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Activity className="w-6 h-6 text-blue-500 animate-pulse" />
                    <div>
                      <p className="font-semibold text-gray-900">Appointment in Progress</p>
                      <p className="text-sm text-gray-600">{currentBooking.provider.name}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setView('tracking')}
                    className="text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    View <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Services Grid */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose a Service</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => searchProviders(service.id)}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center group"
                  >
                    <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">{service.name}</h4>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Bookings */}
            {bookingHistory.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Appointments</h3>
                <div className="space-y-4">
                  {bookingHistory.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{booking.provider.avatar}</div>
                        <div>
                          <p className="font-semibold text-gray-900">{booking.provider.name}</p>
                          <p className="text-sm text-gray-600">{booking.provider.specialty}</p>
                          <p className="text-xs text-gray-500">{new Date(booking.scheduledTime).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{booking.provider.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Booking View */}
        {view === 'booking' && (
          <div className="space-y-6">
            <button
              onClick={() => { setView('home'); setSelectedService(null); setAvailableProviders([]); }}
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              ← Back
            </button>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {services.find(s => s.id === selectedService)?.name}
              </h2>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{location}</span>
              </div>
            </div>

            {searchingProviders ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Search className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Finding Available Providers</h3>
                <p className="text-gray-600">Please wait while we match you with the best provider...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Available Providers</h3>
                {availableProviders.map((provider) => (
                  <div key={provider.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex gap-4">
                        <div className="text-5xl">{provider.avatar}</div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{provider.name}</h4>
                          <p className="text-gray-600">{provider.specialty}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">{provider.rating}</span>
                            </div>
                            <span>{provider.completedVisits} visits</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">${provider.price}</div>
                        <div className="text-sm text-gray-500">per visit</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex gap-6 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{provider.distance} away</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{provider.eta} ETA</span>
                        </div>
                      </div>
                      <button
                        onClick={() => bookProvider(provider)}
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors font-semibold"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tracking View */}
        {view === 'tracking' && currentBooking && (
          <div className="space-y-6">
            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl h-96 flex items-center justify-center relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="text-center z-10">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce" />
                <p className="text-xl font-semibold text-gray-700">Tracking in Real-Time</p>
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-6xl">{currentBooking.provider.avatar}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">{currentBooking.provider.name}</h3>
                  <p className="text-gray-600">{currentBooking.provider.specialty}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{currentBooking.provider.rating}</span>
                    <span className="text-gray-500">• {currentBooking.provider.completedVisits} visits</span>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="space-y-4 mb-6">
                {(['pending', 'accepted', 'arriving', 'in-progress'] as const).map((status, index) => {
                  const isActive = ['pending', 'accepted', 'arriving', 'in-progress'].indexOf(currentBooking.status) >= index
                  const isCurrent = currentBooking.status === status

                  return (
                    <div key={status} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isActive ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'
                      } ${isCurrent ? 'ring-4 ring-primary/30 animate-pulse' : ''}`}>
                        {isActive ? '✓' : index + 1}
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                          {getStatusMessage(status)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">ETA</p>
                    <p className="font-semibold">{currentBooking.provider.eta}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Distance</p>
                    <p className="font-semibold">{currentBooking.provider.distance}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Scheduled</p>
                    <p className="font-semibold">{new Date(currentBooking.scheduledTime).toLocaleTimeString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Cost</p>
                    <p className="font-semibold">${currentBooking.provider.price}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                {currentBooking.status === 'in-progress' && (
                  <button
                    onClick={completeBooking}
                    className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-secondary transition-colors font-semibold"
                  >
                    Complete Appointment
                  </button>
                )}
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                  Contact Provider
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile View */}
        {view === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  JD
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">John Doe</h2>
                  <p className="text-gray-600">john.doe@email.com</p>
                  <p className="text-sm text-gray-500 mt-1">Member since 2024</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl text-center">
                  <p className="text-3xl font-bold text-blue-600">{bookingHistory.length}</p>
                  <p className="text-gray-600">Total Appointments</p>
                </div>
                <div className="bg-green-50 p-6 rounded-xl text-center">
                  <p className="text-3xl font-bold text-green-600">4.9</p>
                  <p className="text-gray-600">Average Rating</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl text-center">
                  <p className="text-3xl font-bold text-purple-600">${bookingHistory.reduce((sum, b) => sum + b.provider.price, 0)}</p>
                  <p className="text-gray-600">Total Spent</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Account Settings</h3>
                <button className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">Personal Information</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <button className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">Payment Methods</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <button className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">Saved Locations</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {bookingHistory.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Appointment History</h3>
                <div className="space-y-4">
                  {bookingHistory.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-4xl">{booking.provider.avatar}</div>
                          <div>
                            <p className="font-semibold text-gray-900">{booking.provider.name}</p>
                            <p className="text-sm text-gray-600">{booking.provider.specialty}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(booking.scheduledTime).toLocaleDateString()} at {new Date(booking.scheduledTime).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">${booking.provider.price}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold">{booking.provider.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
