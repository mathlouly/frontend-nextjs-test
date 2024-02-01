import { ReactNode, createContext, useContext, useState } from 'react';

import { IToastMessage } from '@/types/toast-message.d';

import styles from './style.module.css';

type ToastMessageProps = {
	content: IToastMessage;
};

export const ToastMessage: React.FC<ToastMessageProps> = ({ content: data }) => {
	const { removeToast } = useToastMessageContext();

	return (
		<div className={styles.container} data-toast-type={data.type} data-toast-id={data.id}>
			<span data-content>{data.message}</span>

			<span data-close onClick={() => removeToast(data)}>╳</span>
		</div>
	);
};

type ToastMessageContextProps = {
	fireToast: (newToast: IToastMessage) => void;
	removeToast: (toast: IToastMessage) => void;
};

const ToastContext = createContext<ToastMessageContextProps>({} as ToastMessageContextProps);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
	const [toasts, setToasts] = useState<IToastMessage[]>([]);

	const fireToast = (newToast: IToastMessage) => {
		let currentToast = toasts.find(toast => toast.id == newToast.id); 
		if (!currentToast) {
			setToasts([...toasts, newToast]);
			countDownRemoveToast(newToast);
		}
	}

	const countDownRemoveToast = (toast: IToastMessage) => {
		new Promise<void>((res) => {
		setTimeout(() => {
			removeToast(toast);
			res();
		}, (toast.duration ?? 5) * 1000);
		});
	}

	const removeToast = (toast: IToastMessage) => {
		var index = toasts.findIndex(t => t.id == toast.id);
		if (index > -1) {
			toasts.splice(index, 1);
			setToasts([...toasts]);
		}
	}

	return (
		<ToastContext.Provider value={{fireToast, removeToast}}>
			<div className={styles['toast-container']}>
				{toasts.map((toast) => (
					<ToastMessage key={toast.id} content={toast} />
				))}
			</div>
			{children}
		</ToastContext.Provider>
	);
}

export const useToastMessageContext = () => useContext(ToastContext);

