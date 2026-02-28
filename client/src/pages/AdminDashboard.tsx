/*
  Admin Dashboard - Subscriber & Booking Management
  Only accessible to admin users (Manus OAuth)
*/

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Calendar, BookOpen, Download, RefreshCw, CheckCircle, XCircle, Clock, Mail, Eye, EyeOff, Loader2, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";

export default function AdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [subscriberPage, setSubscriberPage] = useState(1);
  const [blogPage, setBlogPage] = useState(1);

  const { data: subscriberData, isLoading: loadingSubs, refetch: refetchSubs } = trpc.admin.getSubscribers.useQuery(
    { page: subscriberPage, limit: 50 },
    { enabled: isAuthenticated && user?.role === 'admin' }
  );

  const { data: bookingData, isLoading: loadingBookings, refetch: refetchBookings } = trpc.admin.getBookings.useQuery(
    undefined,
    { enabled: isAuthenticated && user?.role === 'admin' }
  );

  const { data: blogData, isLoading: loadingBlog, refetch: refetchBlog } = trpc.admin.getBlogPosts.useQuery(
    { page: blogPage },
    { enabled: isAuthenticated && user?.role === 'admin' }
  );

  const { data: exportData, refetch: fetchExport } = trpc.admin.exportSubscribers.useQuery(undefined, {
    enabled: false,
  });

  const updateBookingMutation = trpc.admin.updateBookingStatus.useMutation({
    onSuccess: () => {
      toast.success("Booking status updated");
      refetchBookings();
    },
    onError: (err) => toast.error(err.message),
  });

  const deactivateMutation = trpc.admin.deactivateSubscriber.useMutation({
    onSuccess: () => {
      toast.success("Subscriber deactivated");
      refetchSubs();
    },
    onError: (err) => toast.error(err.message),
  });

  const toggleBlogMutation = trpc.admin.toggleBlogPost.useMutation({
    onSuccess: () => {
      toast.success("Blog post updated");
      refetchBlog();
    },
    onError: (err) => toast.error(err.message),
  });

  const triggerBlogMutation = trpc.admin.triggerBlogGeneration.useMutation({
    onSuccess: (data) => toast.success(data.message),
    onError: (err) => toast.error(err.message),
  });

  const handleExportCSV = async () => {
    const result = await fetchExport();
    if (result.data?.csv) {
      const blob = new Blob([result.data.csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Exported ${result.data.count} subscribers`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">You must be signed in to access this page.</p>
          <Button onClick={() => setLocation('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Admin Access Required</h2>
          <p className="text-gray-600 mb-4">This page is only accessible to administrators.</p>
          <Button onClick={() => setLocation('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const stats = subscriberData?.stats;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.99 0.005 90)" }}>
      <Navigation />

      <section className="pt-32 pb-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="font-display text-4xl font-bold mb-2" style={{ color: "oklch(0.15 0.03 250)" }}>
              Admin Dashboard
            </h1>
            <p style={{ color: "oklch(0.45 0.02 250)" }}>Manage subscribers, bookings, and content</p>
          </motion.div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Users size={24} style={{ color: "oklch(0.72 0.14 85)" }} />
                    <div>
                      <p className="text-2xl font-bold">{stats.total}</p>
                      <p className="text-sm text-gray-500">Total Subscribers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={24} className="text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.verified}</p>
                      <p className="text-sm text-gray-500">Verified</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <BarChart3 size={24} className="text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.active}</p>
                      <p className="text-sm text-gray-500">Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Mail size={24} style={{ color: "oklch(0.72 0.14 85)" }} />
                    <div>
                      <p className="text-2xl font-bold">{stats.withPassword}</p>
                      <p className="text-sm text-gray-500">Members</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <Tabs defaultValue="subscribers">
            <TabsList className="mb-6">
              <TabsTrigger value="subscribers">
                <Users size={16} className="mr-2" /> Subscribers
              </TabsTrigger>
              <TabsTrigger value="bookings">
                <Calendar size={16} className="mr-2" /> Bookings
              </TabsTrigger>
              <TabsTrigger value="blog">
                <BookOpen size={16} className="mr-2" /> Blog Posts
              </TabsTrigger>
            </TabsList>

            {/* Subscribers Tab */}
            <TabsContent value="subscribers">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Subscribers ({subscriberData?.total || 0})</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => refetchSubs()}>
                      <RefreshCw size={14} className="mr-1" /> Refresh
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleExportCSV}>
                      <Download size={14} className="mr-1" /> Export CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {loadingSubs ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="animate-spin" size={24} />
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Tags</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {subscriberData?.subscribers.map((sub) => (
                            <TableRow key={sub.id}>
                              <TableCell className="font-medium">{sub.email}</TableCell>
                              <TableCell>{[sub.firstName, sub.lastName].filter(Boolean).join(' ') || '—'}</TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  {sub.isVerified ? (
                                    <Badge className="bg-green-100 text-green-700 text-xs">Verified</Badge>
                                  ) : (
                                    <Badge variant="outline" className="text-xs">Unverified</Badge>
                                  )}
                                  {!sub.isActive && (
                                    <Badge variant="destructive" className="text-xs">Inactive</Badge>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs">
                                  {sub.isMember ? 'Member' : 'Subscriber'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {sub.tags.slice(0, 2).map(tag => (
                                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                                  ))}
                                  {sub.tags.length > 2 && <Badge variant="secondary" className="text-xs">+{sub.tags.length - 2}</Badge>}
                                </div>
                              </TableCell>
                              <TableCell className="text-sm text-gray-500">
                                {new Date(sub.createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                {sub.isActive && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 hover:text-red-700 text-xs"
                                    onClick={() => deactivateMutation.mutate({ subscriberId: sub.id })}
                                  >
                                    Deactivate
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                          {(!subscriberData?.subscribers || subscriberData.subscribers.length === 0) && (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                                No subscribers yet
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {/* Pagination */}
                  {subscriberData && subscriberData.total > 50 && (
                    <div className="flex justify-center gap-2 mt-4">
                      <Button variant="outline" size="sm" disabled={subscriberPage === 1} onClick={() => setSubscriberPage(p => p - 1)}>Previous</Button>
                      <span className="flex items-center text-sm text-gray-500">Page {subscriberPage}</span>
                      <Button variant="outline" size="sm" disabled={subscriberPage * 50 >= subscriberData.total} onClick={() => setSubscriberPage(p => p + 1)}>Next</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Booking Requests ({bookingData?.total || 0})</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => refetchBookings()}>
                    <RefreshCw size={14} className="mr-1" /> Refresh
                  </Button>
                </CardHeader>
                <CardContent>
                  {loadingBookings ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="animate-spin" size={24} />
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Meeting Type</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bookingData?.bookings.map((booking) => (
                            <TableRow key={booking.id}>
                              <TableCell className="font-medium">{booking.name}</TableCell>
                              <TableCell>{booking.email}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs capitalize">{booking.meetingType}</Badge>
                              </TableCell>
                              <TableCell className="text-sm">
                                {new Date(booking.requestedDate).toLocaleDateString()} at {booking.requestedTime}
                              </TableCell>
                              <TableCell>
                                <Badge className={`text-xs ${
                                  booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                  booking.status === 'declined' ? 'bg-red-100 text-red-700' :
                                  booking.status === 'cancelled' ? 'bg-gray-100 text-gray-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {booking.status === 'pending' && <Clock size={10} className="mr-1 inline" />}
                                  {booking.status === 'confirmed' && <CheckCircle size={10} className="mr-1 inline" />}
                                  {booking.status === 'declined' && <XCircle size={10} className="mr-1 inline" />}
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {booking.status === 'pending' && (
                                  <div className="flex gap-1">
                                    <Button
                                      size="sm"
                                      className="text-xs h-7 bg-green-600 hover:bg-green-700 text-white"
                                      onClick={() => updateBookingMutation.mutate({ bookingId: booking.id, status: 'confirmed' })}
                                    >
                                      Confirm
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-xs h-7 text-red-500 border-red-200"
                                      onClick={() => updateBookingMutation.mutate({ bookingId: booking.id, status: 'declined' })}
                                    >
                                      Decline
                                    </Button>
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                          {(!bookingData?.bookings || bookingData.bookings.length === 0) && (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                                No booking requests yet
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Blog Posts Tab */}
            <TabsContent value="blog">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Blog Posts ({blogData?.total || 0})</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => refetchBlog()}>
                      <RefreshCw size={14} className="mr-1" /> Refresh
                    </Button>
                    <Button
                      size="sm"
                      style={{ backgroundColor: "oklch(0.72 0.14 85)" }}
                      className="text-white"
                      onClick={() => triggerBlogMutation.mutate()}
                      disabled={triggerBlogMutation.isPending}
                    >
                      {triggerBlogMutation.isPending ? <Loader2 size={14} className="mr-1 animate-spin" /> : <RefreshCw size={14} className="mr-1" />}
                      Generate Today's Articles
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {loadingBlog ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="animate-spin" size={24} />
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Published</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {blogData?.posts.map((post) => (
                            <TableRow key={post.id}>
                              <TableCell className="font-medium max-w-xs truncate">{post.title}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs">{post.category}</Badge>
                              </TableCell>
                              <TableCell className="text-sm text-gray-500">
                                {new Date(post.publishedAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                {post.isPublished ? (
                                  <Badge className="bg-green-100 text-green-700 text-xs">Published</Badge>
                                ) : (
                                  <Badge variant="outline" className="text-xs text-gray-500">Draft</Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs"
                                  onClick={() => toggleBlogMutation.mutate({ postId: post.id, isPublished: !post.isPublished })}
                                >
                                  {post.isPublished ? (
                                    <><EyeOff size={12} className="mr-1" /> Unpublish</>
                                  ) : (
                                    <><Eye size={12} className="mr-1" /> Publish</>
                                  )}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                          {(!blogData?.posts || blogData.posts.length === 0) && (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                                No blog posts yet. Click "Generate Today's Articles" to create some.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {/* Blog Pagination */}
                  {blogData && blogData.total > 20 && (
                    <div className="flex justify-center gap-2 mt-4">
                      <Button variant="outline" size="sm" disabled={blogPage === 1} onClick={() => setBlogPage(p => p - 1)}>Previous</Button>
                      <span className="flex items-center text-sm text-gray-500">Page {blogPage}</span>
                      <Button variant="outline" size="sm" disabled={blogPage * 20 >= blogData.total} onClick={() => setBlogPage(p => p + 1)}>Next</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
