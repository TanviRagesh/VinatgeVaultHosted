import React, { useState } from 'react';
import { ArrowLeft, User, MapPin, Package, Heart, Edit, LogOut, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { User as UserType, Address } from '../types';

interface ProfilePageProps {
  user: UserType | null;
  onUpdateProfile: (user: UserType) => void;
  onLogout: () => void;
  onBackToHome: () => void;
}

export function ProfilePage({ user, onUpdateProfile, onLogout, onBackToHome }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserType | null>(user);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    isDefault: false
  });
  const [showAddAddress, setShowAddAddress] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-[var(--vintage-off-white)] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl mb-4 text-[var(--vintage-dark-brown)]">Please login to view your profile</h2>
            <Button onClick={onBackToHome}>Go to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveProfile = () => {
    if (editedUser) {
      onUpdateProfile(editedUser);
      setIsEditing(false);
    }
  };

  const handleAddAddress = () => {
    if (editedUser && newAddress.name && newAddress.street && newAddress.city) {
      const addressToAdd: Address = {
        id: Date.now().toString(),
        name: newAddress.name!,
        street: newAddress.street!,
        city: newAddress.city!,
        state: newAddress.state || '',
        zipCode: newAddress.zipCode || '',
        phone: newAddress.phone || user.phone,
        isDefault: newAddress.isDefault || false
      };

      setEditedUser({
        ...editedUser,
        addresses: [...editedUser.addresses, addressToAdd]
      });

      setNewAddress({
        name: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        isDefault: false
      });
      setShowAddAddress(false);
    }
  };

  // Use actual orders from user, with fallback to mock data for demo
  const orders = user.orders && user.orders.length > 0 ? user.orders : [];

  return (
    <div className="min-h-screen bg-[var(--vintage-off-white)] py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onBackToHome}
              className="text-[var(--vintage-brown)] hover:text-[var(--vintage-dark-brown)]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-4xl text-[var(--vintage-dark-brown)]">My Profile</h1>
              <p className="text-[var(--vintage-brown)]">Manage your vintage collection journey</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={onLogout}
            className="border-[var(--vintage-maroon)] text-[var(--vintage-maroon)] hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-[var(--vintage-cream)] border-[var(--vintage-gold)] vintage-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-[var(--vintage-gold)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-[var(--vintage-dark-brown)]" />
                </div>
                <h3 className="text-xl mb-2 text-[var(--vintage-dark-brown)]">{user.name}</h3>
                <p className="text-[var(--vintage-brown)] mb-4">{user.email}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--vintage-brown)]">Orders:</span>
                    <span className="text-[var(--vintage-dark-brown)]">{orders.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--vintage-brown)]">Wishlist:</span>
                    <span className="text-[var(--vintage-dark-brown)]">{user.wishlist.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--vintage-brown)]">Addresses:</span>
                    <span className="text-[var(--vintage-dark-brown)]">{user.addresses.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-[var(--vintage-beige)]">
                <TabsTrigger value="profile">Profile Info</TabsTrigger>
                <TabsTrigger value="orders">Order History</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
              </TabsList>

              {/* Profile Info Tab */}
              <TabsContent value="profile">
                <Card className="bg-[var(--vintage-cream)] border-[var(--vintage-gold)]">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-[var(--vintage-dark-brown)]">
                      Personal Information
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(!isEditing)}
                        className="border-[var(--vintage-gold)] text-[var(--vintage-dark-brown)]"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        {isEditing ? 'Cancel' : 'Edit'}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <>
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={editedUser?.name || ''}
                            onChange={(e) => setEditedUser(prev => prev ? { ...prev, name: e.target.value } : null)}
                            className="bg-[var(--vintage-parchment)] border-[var(--vintage-gold)]"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editedUser?.email || ''}
                            onChange={(e) => setEditedUser(prev => prev ? { ...prev, email: e.target.value } : null)}
                            className="bg-[var(--vintage-parchment)] border-[var(--vintage-gold)]"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={editedUser?.phone || ''}
                            onChange={(e) => setEditedUser(prev => prev ? { ...prev, phone: e.target.value } : null)}
                            className="bg-[var(--vintage-parchment)] border-[var(--vintage-gold)]"
                          />
                        </div>
                        <Button
                          onClick={handleSaveProfile}
                          className="bg-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-off-white)]"
                        >
                          Save Changes
                        </Button>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <Label className="text-[var(--vintage-brown)]">Full Name</Label>
                          <p className="text-[var(--vintage-dark-brown)]">{user.name}</p>
                        </div>
                        <div>
                          <Label className="text-[var(--vintage-brown)]">Email</Label>
                          <p className="text-[var(--vintage-dark-brown)]">{user.email}</p>
                        </div>
                        <div>
                          <Label className="text-[var(--vintage-brown)]">Phone</Label>
                          <p className="text-[var(--vintage-dark-brown)]">{user.phone}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <Card className="bg-[var(--vintage-cream)] border-[var(--vintage-gold)]">
                  <CardHeader>
                    <CardTitle className="text-[var(--vintage-dark-brown)]">
                      <Package className="h-5 w-5 mr-2 inline" />
                      Order History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders.length === 0 ? (
                        <div className="text-center py-8">
                          <Package className="h-16 w-16 mx-auto text-[var(--vintage-warm-gray)] mb-4" />
                          <h3 className="text-lg mb-2 text-[var(--vintage-dark-brown)]">No Orders Yet</h3>
                          <p className="text-[var(--vintage-brown)] mb-4">
                            Start your vintage journey by placing your first order!
                          </p>
                          <Button
                            onClick={onBackToHome}
                            className="bg-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-off-white)]"
                          >
                            Browse Collection
                          </Button>
                        </div>
                      ) : (
                        orders.slice().reverse().map((order) => (
                          <div key={order.id} className="border border-[var(--vintage-gold)] rounded-lg p-4 vintage-shadow">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="text-[var(--vintage-dark-brown)]">Order #{order.id}</h4>
                                <p className="text-sm text-[var(--vintage-brown)]">
                                  {order.date.toLocaleDateString()} • {order.items.length} item{order.items.length > 1 ? 's' : ''}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-[var(--vintage-dark-brown)]">₹{order.total.toLocaleString()}</p>
                                <Badge
                                  className={`${
                                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                    order.status === 'placed' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}
                                >
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                              </div>
                            </div>
                            
                            {/* Show items in order */}
                            <div className="mb-3">
                              {order.items.slice(0, 2).map((item, index) => (
                                <p key={index} className="text-sm text-[var(--vintage-brown)]">
                                  • {item.product.name} (Qty: {item.quantity})
                                </p>
                              ))}
                              {order.items.length > 2 && (
                                <p className="text-sm text-[var(--vintage-warm-gray)]">
                                  ... and {order.items.length - 2} more item{order.items.length - 2 > 1 ? 's' : ''}
                                </p>
                              )}
                            </div>

                            {/* Show discount info if applicable */}
                            {order.couponCode && order.discount > 0 && (
                              <div className="text-sm text-[var(--vintage-brown)] mb-2">
                                <span className="inline-flex items-center px-2 py-1 bg-[var(--vintage-gold)] text-[var(--vintage-dark-brown)] rounded text-xs">
                                  🎫 {order.couponCode} - Saved ₹{order.discount.toLocaleString()}
                                </span>
                              </div>
                            )}

                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="border-[var(--vintage-gold)]">
                                View Details
                              </Button>
                              {order.status === 'delivered' && (
                                <Button variant="outline" size="sm" className="border-[var(--vintage-gold)]">
                                  Reorder
                                </Button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses">
                <Card className="bg-[var(--vintage-cream)] border-[var(--vintage-gold)]">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-[var(--vintage-dark-brown)]">
                      <span>
                        <MapPin className="h-5 w-5 mr-2 inline" />
                        Saved Addresses
                      </span>
                      <Button
                        onClick={() => setShowAddAddress(!showAddAddress)}
                        className="bg-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-off-white)]"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Address
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {showAddAddress && (
                      <Card className="mb-6 bg-[var(--vintage-parchment)] border-[var(--vintage-gold)]">
                        <CardContent className="p-4">
                          <h4 className="text-lg mb-4 text-[var(--vintage-dark-brown)]">Add New Address</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              placeholder="Full Name"
                              value={newAddress.name}
                              onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                              className="bg-white border-[var(--vintage-gold)]"
                            />
                            <Input
                              placeholder="Phone Number"
                              value={newAddress.phone}
                              onChange={(e) => setNewAddress(prev => ({ ...prev, phone: e.target.value }))}
                              className="bg-white border-[var(--vintage-gold)]"
                            />
                          </div>
                          <Textarea
                            placeholder="Street Address"
                            value={newAddress.street}
                            onChange={(e) => setNewAddress(prev => ({ ...prev, street: e.target.value }))}
                            className="mt-4 bg-white border-[var(--vintage-gold)]"
                            rows={3}
                          />
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <Input
                              placeholder="City"
                              value={newAddress.city}
                              onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                              className="bg-white border-[var(--vintage-gold)]"
                            />
                            <Input
                              placeholder="State"
                              value={newAddress.state}
                              onChange={(e) => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                              className="bg-white border-[var(--vintage-gold)]"
                            />
                            <Input
                              placeholder="PIN Code"
                              value={newAddress.zipCode}
                              onChange={(e) => setNewAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                              className="bg-white border-[var(--vintage-gold)]"
                            />
                          </div>
                          <div className="flex space-x-2 mt-4">
                            <Button
                              onClick={handleAddAddress}
                              className="bg-[var(--vintage-dark-brown)] hover:bg-[var(--vintage-brown)] text-[var(--vintage-off-white)]"
                            >
                              Save Address
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setShowAddAddress(false)}
                              className="border-[var(--vintage-gold)]"
                            >
                              Cancel
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <div className="space-y-4">
                      {user.addresses.length === 0 ? (
                        <p className="text-[var(--vintage-brown)] text-center py-8">
                          No addresses saved yet. Add your first address to get started.
                        </p>
                      ) : (
                        user.addresses.map((address) => (
                          <div key={address.id} className="border border-[var(--vintage-gold)] rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-[var(--vintage-dark-brown)] mb-1">{address.name}</h4>
                                <p className="text-[var(--vintage-brown)] text-sm">
                                  {address.street}<br />
                                  {address.city}, {address.state} {address.zipCode}<br />
                                  Phone: {address.phone}
                                </p>
                                {address.isDefault && (
                                  <Badge className="mt-2 bg-[var(--vintage-gold)] text-[var(--vintage-dark-brown)]">
                                    Default
                                  </Badge>
                                )}
                              </div>
                              <div className="space-x-2">
                                <Button variant="outline" size="sm" className="border-[var(--vintage-gold)]">
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm" className="border-red-300 text-red-600">
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}