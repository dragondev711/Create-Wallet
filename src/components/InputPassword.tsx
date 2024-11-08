import { useEffect, useState } from "react";

const degree = ["Very Weak", "Weak", "Fair", "Good", "Excellent", "Outstanding"];

interface props {
    inputName: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    setMatchPassword: React.Dispatch<React.SetStateAction<Boolean>>,
}
const InputPassword: React.FC<props> = ({ setPassword, setMatchPassword }) => {
    const [hiddenConfirm, setHiddenConfirm] = useState<Boolean>(true);
    const [hidden, setHidden] = useState<Boolean>(true);
    const [passowrdStrength, setPasswordStrength] = useState<number>(-1);
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [tempPassword, setTempPassword] = useState<string>("");

    const evaluatePassword = (isConfirmPassword: Boolean, text: string): void => {
        console.log(text);
        
        !isConfirmPassword?setTempPassword(text):setConfirmPassword(text);
        setPasswordStrength(0);

        if (!text) setPasswordStrength(-1);

        const hasLowercase = /[a-z]/.test(text);
        const hasUppercase = /[A-Z]/.test(text);
        const hasNumbers = /\d/.test(text);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(text);
        const hasLength = text.length > 8;

        let score = 0;
        if (hasLowercase) score += 1;
        if (hasUppercase) score += 1;
        if (hasNumbers) score += 1;
        if (hasSpecialChars) score += 1;
        if (hasLength) score += 1; else score = 0
        score = score > 5 ? 5 : score;

        setPasswordStrength(score);
        if (text == "") setPasswordStrength(-1);
    }

    const isMatchedPassword = (password: string, confirmPassword: string): void => {
        console.log(passowrdStrength);
        console.log("password:  " + password);
        console.log("confirm:  " + confirmPassword);

        setMatchPassword(false);
        if (password.length > 8 && password === confirmPassword && password != "" && passowrdStrength >= 3) {
            setMatchPassword(true);
            setPassword(tempPassword);
        }
    }

    useEffect(() => {
        isMatchedPassword(tempPassword, confirmPassword);
    }, [confirmPassword, tempPassword]);

    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <div className="my-2 flex flex-col gap-2 rounded-lg bg-[#44444444] w-full px-2 py-1">
                <div>Input your Password</div>
                <div className="flex flex-row justify-between items-center">
                    <input
                        type={`${hidden ? "password" : "text"}`}
                        value={tempPassword}
                        onChange={(e) => { evaluatePassword(false, e.target.value) }}
                        placeholder="Input your password"
                        className="w-[200px] border-0 px-3 py-1 rounded-lg text-[15px]"
                    />
                    <div onClick={() => setHidden(!hidden)}>
                    
                        {hidden ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center text-[10px]">
                <div className="flex flex-row justify-center items-between gap-1">
                    {
                        degree.map((item, index) => {
                            return (
                                <>
                                    <div className={`w-[40px] h-[5px] rounded-lg ${passowrdStrength==-1?"bg-gray-700":(passowrdStrength>=index?((passowrdStrength<3)?"bg-rose-800":"bg-yellow-600"):"bg-gray-700")}`}></div>
                                </>
                            )
                        })
                    }
                </div>
                <div className="text-[13px]">{degree[passowrdStrength]}</div>
            </div>

            <div className="my-2 flex flex-col gap-2 rounded-lg bg-[#44444444] w-full px-2 py-1">
                <div>Input your Confirm Password</div>
                <div className="flex flex-row justify-between items-center">
                    <input
                        type={`${hiddenConfirm ? "password" : "text"}`}
                        value={confirmPassword}
                        onChange={async (e) => { evaluatePassword(true, e.target.value)}}
                        placeholder="Input your confirm password"
                        className="w-[200px] border-0 px-3 py-1 rounded-lg text-[15px]"
                    />
                    <div onClick={() => setHiddenConfirm(!hiddenConfirm)}>
                        {hiddenConfirm ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputPassword;