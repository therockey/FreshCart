import {FadeLoader} from "react-spinners";

export const Loader = () =>
    <div className="flex items-center justify-center flex-grow">
        <FadeLoader color="#5d5988" loading={true}/>
    </div>
