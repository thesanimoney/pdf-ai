import {create} from 'zustand'
import {ChangeEvent} from "react";

type MessageStore = {
    addMessage: (text: string) => void
    message: string
    handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
    isLoading: boolean
}

interface LoadingState {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
    isLoading: false,
    setIsLoading: (loading: boolean) => set({ isLoading: loading }),
}));

export const useStoreMessage = create<MessageStore>()((set) => ({
    message: '',
    addMessage: (text  ) => set({message: text}),
    handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => {},
    isLoading: true,
}))

