import {BeatLoader} from "react-spinners";

function LoadingSpinner() {
    return <>
        <div className={'flex justify-center items-center h-[50vh]'}>
            <BeatLoader color={'#f58d4c'} size={15}/>
        </div>
    </>
}

export default LoadingSpinner;