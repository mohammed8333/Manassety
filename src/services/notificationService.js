import { dbService } from './supabase.js';
import appStore from '../store/appStore.js';

export const notificationService = {
    // Load notifications for a user
    async loadNotifications(userId) {
        try {
            const data = await dbService.getDoc('notifications', userId);
            if (data && Array.isArray(data.list)) {
                appStore.setNotifications(data.list);
            } else {
                appStore.setNotifications([]);
            }
        } catch (error) {
            console.error("Error loading notifications:", error);
            appStore.setNotifications([]);
        }
    },

    // Add a new notification
    async addNotification(type, title, message) {
        const user = appStore.getState().user;
        const currentNotifications = [...appStore.getState().notifications];
        
        const newNotif = {
            id: 'notif-' + Math.random().toString(36).substr(2, 9),
            type, // 'success', 'info', 'warning'
            title,
            message,
            date: new Date().toISOString(),
            read: false
        };

        const updated = [newNotif, ...currentNotifications].slice(0, 50); // limit to 50
        appStore.setNotifications(updated);

        // If user logged in, persist to database
        if (user && user.uid) {
            try {
                await dbService.setDoc('notifications', user.uid, { list: updated });
            } catch (error) {
                console.error("Error saving notification:", error);
            }
        }
    },

    // Mark specific notification as read
    async markAsRead(notificationId) {
        const user = appStore.getState().user;
        const updated = appStore.getState().notifications.map(n => 
            n.id === notificationId ? { ...n, read: true } : n
        );
        appStore.setNotifications(updated);

        if (user && user.uid) {
            try {
                await dbService.setDoc('notifications', user.uid, { list: updated });
            } catch (error) {
                console.error("Error updating notification:", error);
            }
        }
    },

    // Clear all notifications
    async clearAll() {
        const user = appStore.getState().user;
        appStore.setNotifications([]);

        if (user && user.uid) {
            try {
                await dbService.setDoc('notifications', user.uid, { list: [] });
            } catch (error) {
                console.error("Error clearing notifications:", error);
            }
        }
    }
};

export default notificationService;
