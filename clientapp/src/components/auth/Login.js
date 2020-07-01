import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FlexDiv, { SideInfo } from '../common/FlexDiv';
import { PTag } from '../common/PTag';
import TextFieldGroup from '../common/TextFieldGroup';
import '../common/common.css';
import { loginUser } from '../../actions/authActions';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isApiCalled, setApiCalled] = useState(false);
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    const { error } = auth;
    const {
        email: emailErr,
        password: passwordErr,
    } = error;
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
            setApiCalled(false);
        }
    }, [error])

    const submit = (e) => {
        e.preventDefault()
        const data = { email, password };
        dispatch(loginUser(data, push));
        setApiCalled(true);
    }

    return (
        <FlexDiv height="100vh">
            <SideInfo
                imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTXd9cnWRbO0zwjFcxFEP14Xk5AnK6JuMHKowggYZtMiU8otiHh&usqp=CAU"
            >
                <PTag fs="36px" clr="#9E9E9E" fw="600">Hello :)</PTag>
            </SideInfo>
            <FlexDiv ai="center" jc="center" wid="50%">
                <FlexDiv fd="column" jc="center" wid="100%" pd="0 20%">
                    <form onSubmit={submit}>
                        <PTag clr="#1da2d8" fs="18px" fw="600" ta="center">Login</PTag>
                        <PTag ta="center">Don't have an account? <Link to="/register">Sign up</Link></PTag>
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
                        <button type="submit" disabled={isApiCalled} className="primary_btn">Login</button>
                    </form>
                </FlexDiv>
            </FlexDiv>
        </FlexDiv>
    )
}

export default Login;