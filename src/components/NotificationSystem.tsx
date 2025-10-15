import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Heart, ShoppingCart, X } from 'lucide-react';
import { Button } from './ui/button';
import { Notification } from '../types';

interface NotificationSystemProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
  onAction?: (id: string) => void;
}

export function NotificationSystem({ notifications, onDismiss, onAction }: NotificationSystemProps) {
  const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setVisibleNotifications(notifications.filter(n => n.isVisible));
  }, [notifications]);

  useEffect(() => {
    // Auto-dismiss notifications after 4 seconds
    const timers = visibleNotifications.map(notification => {
      return setTimeout(() => {
        onDismiss(notification.id);
      }, 4000);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [visibleNotifications, onDismiss]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'cart':
        return <ShoppingCart className="w-5 h-5 text-[var(--vintage-dark-brown)]" />;
      case 'wishlist':
        return <Heart className="w-5 h-5 text-[var(--vintage-maroon)]" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-[var(--vintage-dark-green)]" />;
      default:
        return <CheckCircle className="w-5 h-5 text-[var(--vintage-dark-brown)]" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'cart':
        return 'bg-[var(--vintage-cream)]';
      case 'wishlist':
        return 'bg-[var(--vintage-parchment)]';
      case 'success':
        return 'bg-[var(--vintage-beige)]';
      default:
        return 'bg-[var(--vintage-cream)]';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <AnimatePresence>
        {visibleNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`
              ${getBackgroundColor(notification.type)}
              border-2 border-[var(--vintage-gold)]
              rounded-lg p-4 shadow-lg vintage-shadow
              max-w-sm w-full
              relative
            `}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1">
                <p className="text-sm text-[var(--vintage-dark-brown)] mb-2">
                  {notification.message}
                </p>
                
                {notification.action && (
                  <Button
                    onClick={() => {
                      if (onAction) onAction(notification.id);
                      onDismiss(notification.id);
                    }}
                    className="bg-[var(--vintage-gold)] hover:bg-[var(--vintage-dark-brown)] text-[var(--vintage-dark-brown)] hover:text-[var(--vintage-off-white)] border-none px-3 py-1 h-auto text-xs vintage-hover"
                  >
                    {notification.action.label}
                  </Button>
                )}
              </div>
              
              <button
                onClick={() => onDismiss(notification.id)}
                className="flex-shrink-0 text-[var(--vintage-warm-gray)] hover:text-[var(--vintage-dark-brown)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}