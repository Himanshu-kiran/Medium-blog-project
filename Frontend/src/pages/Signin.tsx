import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signin = function () {
    return <div>
        <div className="grid grid-cols-2 lg:grid-cols">
            <div>
               <Auth type="signin"/>
            </div>
            <div className="hidde lg:block">
                <Quote />
            </div>
        </div>
    </div>
}