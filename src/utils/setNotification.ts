import icon from '../images/logo.jpg';

interface NotificationOptions {
    title: string;
    body?: string;
    data?: any;
    tag?: string;
}

export const setNotificationPermission = () => {
    Notification.requestPermission();
};

export async function setNotification(options: NotificationOptions): Promise<Notification | null>{
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') return null;
    const { title, body, data, tag } = options;
    const notification = new Notification(title, {
        body,
        data,
        icon,
        tag,
    })
    return notification;
};