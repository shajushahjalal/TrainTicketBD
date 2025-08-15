let loadingBarRef = null;

export const setLoadingBarRef = (ref) => {
    loadingBarRef = ref;
};

export const startLoading = () => {
    if (loadingBarRef != null){
        loadingBarRef?.current?.continuousStart();
    } 
        
};

export const stopLoading = () => {
    if (loadingBarRef != null){
        loadingBarRef?.current?.complete();
    }
};