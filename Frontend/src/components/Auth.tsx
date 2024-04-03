import { SignupInput } from "@h_kiran/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";


export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })

    const navigate = useNavigate();
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        }
        catch (e) {
            //alert the user  about request failed
            alert("error in signing")
        }
    }
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className="px-10">
                <div>
                    <div className="text-3xl font-bold">
                            {type === "signup" ? "Create an account" : "Sign in"}                     </div>
                    <div className="t ext-slate-400">
                        {type === "signin" ? "Don't have account yet?" : "Already have an account?"}
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "sign up  " : "sign in"}
                        </Link>
                    </div>
                </div>
                <div className="pt-4">
                    {type === "signup" ? <LabelledInput label="Name " placeholder="Put your name here" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} /> : null}

                    <LabelledInput label="Username" placeholder="Hkran@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs, //existing username and passwrord
                            username: e.target.value
                        })
                    }} />
                    <LabelledInput label="Password" type="password" placeholder="Put your .." onChange={(e) => {
                        setPostInputs({
                            ...postInputs, //existing username and passwrord
                            password: e.target.value
                        })
                    }} />
                    <div className="pt-4">
                        <button onClick={sendRequest} className="w-full bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px- rounded">{type === "signup"}
                        {type === "signin" ? "Sign in" : "Sign up"}

                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm font-medium text-black pt-2">{label}</label>
        <input onChange={onChange} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
    </div>
}