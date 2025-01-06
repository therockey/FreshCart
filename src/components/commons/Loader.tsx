import {FadeLoader} from "react-spinners";

export const Loader = () =>
    <div className="flex items-center justify-center min-h-screen">
        <FadeLoader color="#5d5988" loading={true}/>
    </div>
