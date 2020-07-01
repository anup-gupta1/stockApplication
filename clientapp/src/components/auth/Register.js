import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FlexDiv, { SideInfo } from '../common/FlexDiv';
import { PTag } from '../common/PTag';
import TextFieldGroup from '../common/TextFieldGroup';
import '../common/common.css';
import { registerUser } from '../../actions/authActions';

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fName, setFname] = useState('');
    const [lName, setLname] = useState('');
    const [isApiCalled, setApiCalled] = useState(false);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // errors
    const { error } = auth;
    const { fName: fnameErr,
        lName: lnameErr,
        email: emailErr,
        password: passwordErr,
        confirmPassword: confirmPasswordErr } = error;

    const { history: { push } } = props;


    // runs after first rendering
    useEffect(() => {
        if (auth.isAuthenticated) {
            push('/dashboard');
        }
    }, []);


    // runs whenever there is change in error
    useEffect(() => {
        if (Object.keys(error).length > 0) {
            emailErr && setEmail('');
            passwordErr && setPassword('');
            fnameErr && setFname('');
            lnameErr && setLname('');
            confirmPasswordErr && setConfirmPassword('');
            setApiCalled(false);
        }
    }, [error])

    const submit = (e) => {
        e.preventDefault();
        setApiCalled(true);
        const data = { fName, lName, email, password, confirmPassword };
        dispatch(registerUser(data, push));
    }

    return (
        <FlexDiv height="100vh">
            <SideInfo
                imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-xqKO751E68JgcU771BtdHZyT3Op8kidMHvCA004Cd8fgLiTX&s"
            >
                <PTag fs="36px" clr="#9E9E9E" fw="600">Hello :)</PTag>
            </SideInfo>
            <FlexDiv ai="center" jc="center" wid="50%">
                <FlexDiv fd="column" jc="center" wid="100%" pd="0 20%">
                    <form onSubmit={submit}>
                        <PTag clr="#1da2d8" fs="18px" fw="600" ta="center">Sign-up</PTag>
                        <PTag ta="center">Already have an account? <Link to="/login">Login</Link></PTag>
                        <FlexDiv jc="space-between">
                            <TextFieldGroup
                                name="fname"
                                value={fName}
                                onChange={(e) => setFname(e.target.value)}
                                placeholder="Enter your first name"
                                label="First Name"
                                error={fnameErr}
                            />
                            <TextFieldGroup
                                name="lname"
                                value={lName}
                                onChange={(e) => setLname(e.target.value)}
                                placeholder="Enter your last name"
                                label="Last Name"
                                error={lnameErr}
                            />
                        </FlexDiv>
                        <TextFieldGroup
                            name="email"
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            label="Email Address"
                            error={emailErr}
                        />
                        <TextFieldGroup
                            name="password"
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            label="Password"
                            error={passwordErr}
                        />
                        <TextFieldGroup
                            name="confirmPassword"
                            value={confirmPassword}
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            label="Confirm Password"
                            error={confirmPasswordErr}
                        />
                        <button type="submit" disabled={isApiCalled} className="primary_btn">Join our community</button>
                    </form>
                </FlexDiv>
            </FlexDiv>
        </FlexDiv>
    )
}

export default Register;