import React from 'react';
import Auth from "../api/Auth";
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ApiAuth from '../api/Auth';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF646B'
        },
        secondary: {
            main: '#212121'
        },
    },
    typography: {
      fontFamily: "Noto Sans CJK KR",
    },
});

const StyledBox = styled(Box)`
    border-top: 1px solid #DCDBE4;
    font-family: "Noto Sans CJK KR";
    padding: 32px 0;
`;

const RowNameTypo = styled(Box)`
    display: 'inline-box';
    color: '#FF646B';
    font-size: 18px;
`;

const Signup = () => {
    const [ id, setId ] = React.useState('');
    const [ idValidIdInput, setIsValidIdInput ] = React.useState(false);
    const [ idStateText, setIdStateText ] = React. useState('');
    const [ idError, setIdError ] = React.useState(false);

    const [ password, setPassword] = React.useState('');
    const [ isValidPw, setIsValidPw ] = React.useState();

    const [ passwordForCheck, setPasswordForCheck ] = React.useState('');
    const [ isSamePassword, setIsSamePassword ] = React.useState(false);

    //const [ nickName, setNickName ] = React.useState('');
    //const [ isValidNickNameFormat, setIsValidNickNameFormat ] = React.useState(false);
    //const [ isDuplicatedNickName, setIsDuplicatedNickName ] = React.useState(true);
    //const [ nickNameError, setNickNameError ] = React.useState(false);

    const [ walletAddress, setWalletAddress ] = React.useState('');

    const [ privateKey, setPrivateKey ] = React.useState('');

    const navigate = useNavigate();

    const elemRef = [
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
    ]

    const handleIsValidId = () => {
        let idRegExp = /^[a-zA-z0-9]{8,16}$/;
        if (!idRegExp.test(id)) {
            setIdStateText('올바르지 않은 아이디 형식입니다!');
            setIdError(true);
            return;
        } else { // 서버로 중복확인 요청
            ApiAuth.EmailDuplicateCheck(id)
            .then((response) => {
                if (response == false) {
                    setIdStateText('이미 존재하는 아이디입니다!');
                    setIdError(true);
                    return;
                }
            });
        }
        setIdStateText('사용 가능한 아이디입니다!')
        setIdError(false);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        const pwRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/;
        if( !pwRegExp.test(e.target.value)) {
            setIsValidPw(false);
        } else {
            setIsValidPw(true);
        }
    };

    const handlePasswordCheck = (e) => {
        setPasswordForCheck(e.target.value);
        if (e.target.value === password) {
            setIsSamePassword(true);
        } else {
            setIsSamePassword(false);
        }
    };

    // const handleNickName = (e) => {
    //     setNickName(e.target.value);
    //     let isValid = (e.target.value.length >= 2 && e.target.value.length <= 8)
    //     console.log(isValid);
    //     if (isValid) {
    //         setIsValidNickNameFormat(true);
    //         setNickNameError(false);
    //     } else {
    //         setIsValidNickNameFormat(false);
    //         setNickNameError(true);
    //     }
    // };

    // const handleNickNameCheckButton = () => {
    //     // 중복체크 확인
    //     if (!isValidNickNameFormat){
    //         setNickNameError(true);
    //         setIsValidNickNameFormat(true);
    //         return;
    //     } else {
    //         console.log('hello ' + nickName);
    //         ApiAuth.NickDuplicateCheck(nickName)
    //         .then((response) => {
    //             console.log(response);
    //             if (response == true) {
    //                 setIsDuplicatedNickName(false);
    //                 setNickNameError(false);
                    
    //             } else {
    //                 setIsDuplicatedNickName(true);
    //                 setNickNameError(true);
    //             }
    //         })
    //     }
    // };

    const getWalletAddrFromMetaMask = () => {
        // metamask와 연동 하는 코드 작성 필요
        let testAddress = '0x9ac5Ca2Cd07c9939ABe6341aE9e67e4317245be6';
        setWalletAddress(testAddress);
    };

    const checkPrivateKeyFormate = (key) => {
        let keyRegExp = /^0x[0-9A-Fa-f]{64}$/; 

        if (!keyRegExp.test(key)) {
            return false;
        }
        return true;
    };

    const handleSignUp = () => {
        if (idStateText != '사용 가능한 아이디입니다!') {
            alert('아이디를 입력하세요.');
            scrollTo(0);
            return;
        } else if (!isValidPw || password == '') {
            alert('비밀번호를 입력하세요.');
            scrollTo(1);
            return;
        } else if (!isSamePassword || passwordForCheck == '') {
            alert('비밀번호 확인 입력을 해주세요.');
            scrollTo(2);
            return;
        } //else if (nickNameError || nickName == '' || isDuplicatedNickName || !isValidNickNameFormat) {
        //     alert('닉네임을 입력하세요.');
        //     scrollTo(3);
        //     return; } 
        else if (walletAddress == '') {
            alert('지갑주소를 입력하세요.');
            scrollTo(4);
            return;
        } else if (!checkPrivateKeyFormate(privateKey)) {
            alert('비밀키를 입력하세요.');
            scrollTo(5);
            return;
        }
        // 모든 입력을 완료한 경우서버로 회원가입 요청
        Auth.SignUp({
            //nick: nickName,
            email: id,
            password: password,
            walletAddress: walletAddress,
            privatekey: privateKey
        }).then((response) => {
            if (response.data == '회원 가입 성공') {
                if (window.confirm("회원가입이 완료됐습니다.\n확인버튼을 누르면 로그인 화면으로 이동합니다.\n(취소는 홈화면으로 이동)")) {
                    navigate('/signin');
                } else {
                    navigate('/');
                }
                
            }else {
                alert('가입에 실패했습니다. 다시 시도해주세요.');
            }
        })
    };

    const scrollTo = (index) => {
        elemRef[index].current.scrollIntoView({ behavior: 'smooth', block: 'center'});
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', justifyContent: 'center', minWidth: '1024px', paddingBottom: '100px'}}>
                <Box sx={{width: 1024}}>
                    <Box sx={{ padding: '32px 0', borderBottom: '3px solid #1E1D29', display: 'flex', alignItems: 'center'}}>
                        <Typography
                            sx={{
                                display: 'inline-block',
                                marginRight: '30px',
                                marginLeft: '5px',
                                color: '#212121',
                                fontSize: '26px',
                                fontWeight: 500,
                            }}
                        >회원 가입</Typography>
                        <Typography color={'primary'} display={'inline-block'}>
                            *필수항목
                        </Typography>
                    </Box>
                    <StyledBox ref={elemRef[0]}>
                        <Grid container>
                            <Grid item xs={2}>
                                <Typography fontSize={18} display={'inline-block'}>
                                    아이디
                                </Typography>
                                <Typography fontSize={18} color={'primary'} display={'inline-block'}>
                                    &nbsp;*
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Box marginBottom={'15px'} display={'flex'}>
                                    <TextField
                                        disabled={idStateText === '사용 가능한 아이디입니다!'}
                                        error={idError}
                                        hiddenLabel
                                        id='id-input'
                                        name='id'
                                        placeholder='아이디를 입력하세요. (8자 이상)'
                                        type='text'
                                        size='small'
                                        color={'secondary'}
                                        sx={{ width: 250}}
                                        helperText={
                                            <Typography fontSize={'12px'}color={idError ? 'primary' : '#00AA00'}>
                                                {idStateText}
                                            </Typography>}
                                        onChange={(e) => {setId(e.target.value)}}
                                    />
                                    <Box>
                                        <Button 
                                        disableTouchRipple
                                        sx={{
                                             color: '#666666',
                                             border: '0.5px solid #666666',
                                             fontSize: '13px',
                                             marginLeft: '10px',
                                             '&:hover': {
                                                 backgroundColor: 'transparent'
                                             }
                                        }}
                                        onClick={handleIsValidId}
                                        >중복확인</Button>
                                    </Box>
                                </Box>
                                <Stack>
                                    <Typography fontSize={14} sx={{ color: '#4AA4FF'}}>- 아이디는 영문을 조합하여 8자리 이상, 16자리 이하여야 합니다.</Typography>
                                    <Typography fontSize={14} sx={{ color: '#4AA4FF'}}>- 아이디는 변경할 수 없으니 신중하게 결정해주세요.</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </StyledBox>
                    
                    <StyledBox ref={elemRef[1]}>
                        <Grid container>
                            <Grid item xs={2}>
                                <Typography fontSize={18} display={'inline-block'}>
                                    비밀번호
                                </Typography>
                                <Typography fontSize={18} color={'primary'} display={'inline-block'}>
                                    &nbsp;*
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Box sx={{ height: '50px', marginBottom: '15px'}}>
                                    <TextField
                                        error={password == '' ? false :
                                               isValidPw ? false : true
                                        }
                                        hiddenLabel
                                        id='password-input'
                                        name='password'
                                        placeholder='최소 8자, 최대 16자'
                                        type='password'
                                        size='small'
                                        color={'secondary'}
                                        sx={{ width: 250 }}
                                        helperText={
                                            <Typography fontSize={'12px'}color={isValidPw ? '#00AA00' : 'primary'}>
                                                {password == '' ? '' :
                                                    isValidPw ? '사용 가능한 비밀번호입니다.' :
                                                                '사용 불가능한 비밀번호입니다.'
                                                }
                                            </Typography>}
                                        onChange={handlePassword}
                                    >
                                    </TextField>
                                </Box>
                                <Typography fontSize={14} sx={{ color: '#4AA4FF'}}>
                                    - 비밀번호는 최소 8자, 최대 16자이여야 합니다.
                                </Typography>
                                <Typography fontSize={14} sx={{ color: '#4AA4FF'}}>
                                    - 영어 대문자, 소문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.
                                </Typography>
                            </Grid>
                        </Grid>
                    </StyledBox>
                    
                    <StyledBox ref={elemRef[2]}>
                        <Grid container>
                            <Grid item xs={2}>
                                <Typography fontSize={18} display={'inline-block'}>
                                    비밀번호 확인
                                </Typography>
                                <Typography fontSize={18} color={'primary'} display={'inline-block'}>
                                    &nbsp;*
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Box sx={{ height: '50px'}}>
                                    <TextField
                                        error={passwordForCheck == '' ? false : 
                                               isSamePassword ? false : true
                                        }
                                        hiddenLabel
                                        id='password-check'
                                        name='password-check'
                                        placeholder='비밀번호를 재입력 해주세요.'
                                        type='password'
                                        size='small'
                                        color={'secondary'}
                                        sx={{ width: 250 }}
                                        helperText={
                                            <Typography fontSize={'12px'}color={isSamePassword ? '#00AA00' : 'primary'}>
                                                {passwordForCheck == '' ?  '': 
                                                    isSamePassword ? '일치합니다!' : '일치하지 않습니다!'}
                                            </Typography>
                                        }
                                        onChange={handlePasswordCheck}
                                        ></TextField>
                                </Box>
                            </Grid>
                        </Grid>
                    </StyledBox>
                    
                    {/* <StyledBox ref={elemRef[3]}>
                        <Grid container>
                            <Grid item xs={2}>
                                <Typography fontSize={18} display={'inline-block'}>
                                    닉네임
                                </Typography>
                                <Typography fontSize={18} color={'primary'} display={'inline-block'}>
                                    &nbsp;*
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Stack>
                                    <Box marginBottom={'15px'} display={'flex'} height={'50px'}>
                                        <TextField
                                            disabled={!isDuplicatedNickName}
                                            error={nickNameError}
                                            hiddenLabel
                                            id='nickName'
                                            name='nickName'
                                            placeholder='2자 이상 10자 이하'
                                            type='text'
                                            size='small'
                                            color={'secondary'}
                                            sx={{ width: 250}}
                                            helperText={
                                                <Typography 
                                                    fontSize={'12px'}
                                                    color={nickNameError ? 'primary' : '#00AA00'}
                                                >
                                                    { nickName == '' ? '' :
                                                        !isValidNickNameFormat ? '형식에 맞지 않습니다!' :
                                                        !nickNameError && isDuplicatedNickName ? '' : 
                                                        nickNameError && isDuplicatedNickName ? '이미 존재하는 닉네임 입니다.' :
                                                        '사용 가능한 닉네임 입니다.'
                                                    }
                                                </Typography>}
                                            onChange={handleNickName}
                                        />
                                        <Box>
                                            <Button 
                                            disableTouchRipple
                                            sx={{
                                                 color: '#666666',
                                                 border: '0.5px solid #666666',
                                                 fontSize: '13px',
                                                 marginLeft: '10px',
                                                 '&:hover': {
                                                     backgroundColor: 'transparent'
                                                 }
                                            }}
                                            onClick={handleNickNameCheckButton}
                                            >중복확인</Button>
                                        </Box>
                                    </Box>
                                        
                                </Stack>
                            </Grid>
                        </Grid>
                    </StyledBox> */}
                    
                    <StyledBox ref={elemRef[4]}>
                        <Grid container>
                            <Grid item xs={2}>
                                <Typography fontSize={18} display={'inline-block'}>
                                    지갑 주소
                                </Typography>
                                <Typography fontSize={18} color={'primary'} display={'inline-block'}>
                                    &nbsp;*
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Box sx={{ height: '50px', marginBottom: '15px', display: 'flex'}}>
                                    <TextField
                                        value={walletAddress}
                                        hiddenLabel
                                        id='walletAddress'
                                        placeholder='MetaMask로부터 지갑주소를 가져와 주세요!'
                                        name='walletAddress'
                                        type='text'
                                        size='small'
                                        color={'secondary'}
                                        sx={{ width: 420 }}
                                        InputProps={{ readOnly: false, }}
                                        onChange={(e) => {setWalletAddress(e.target.value);}}
                                    >
                                    </TextField>
                                    <Box marginLeft={'20px'}>
                                        <Button 
                                            disableTouchRipple
                                            sx={{
                                                height: '40px',
                                                color: '#666666',
                                                border: '0.5px solid #666666',
                                                fontSize: '13px',
                                                marginLeft: '10px',
                                                '&:hover': {
                                                    backgroundColor: 'transparent'
                                                }
                                            }}
                                            onClick={getWalletAddrFromMetaMask}
                                        ><img src="/images/MetaMask_Fox.svg.png"/>MetaMask에서 가져오기</Button>
                                    </Box>
                                </Box>
                                <Stack>
                                    <Typography fontSize={14} sx={{ color: '#4AA4FF'}}>- MetaMask는 이더리움(Ethereum) 개인지갑을 관리할 수 있는 chrome extenstion 입니다.</Typography>
                                    <Typography fontSize={14} sx={{ color: '#4AA4FF'}}>- MetaMask를 설치하지 않으셨다면 
                                     &nbsp;<a href="https://metamask.io/download/">링크</a>를 통해 설치 후 진행해주세요.</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </StyledBox>
                    
                    <StyledBox ref={elemRef[5]} borderBottom='1px solid #DCDBE4'>
                        <Grid container>
                            <Grid item xs={2}>
                                <Typography fontSize={18} display={'inline-block'}>
                                    비밀키
                                </Typography>
                                <Typography fontSize={18} color={'primary'} display={'inline-block'}>
                                    &nbsp;*
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Box sx={{ height: '50px', marginBottom: '15px', display: 'flex', marginBottom: '25px'}}>
                                    <TextField
                                        hiddenLabel
                                        id='privateKey'
                                        placeholder='지갑 주소에 해당하는 private key(비밀키)를 입력해주세요!'
                                        name='privateKey'
                                        type='text'
                                        size='small'
                                        color={'secondary'}
                                        sx={{ width: 650 }}
                                        onChange={(e) => setPrivateKey(e.target.value)}
                                        helperText={
                                            <Typography 
                                                fontSize={'12px'}
                                                color={ checkPrivateKeyFormate(privateKey) ? '#00AA00':'primary'}
                                            >
                                                {privateKey == '' ? '' :
                                                checkPrivateKeyFormate(privateKey) ? '올바른 형식입니다.' :
                                                '올바르지 않은 형식입니다.'}
                                            </Typography>}
                                        
                                        
                                    >
                                    </TextField>
                                </Box>
                                <Stack>
                                    <Typography fontSize={14} sx={{ color: '#4AA4FF'}}>
                                        - 이더리움 개인 지갑의 private key는 256비트, 즉 64자리 16진수입니다.
                                    </Typography>
                                    <Typography fontSize={14} sx={{ color: '#4AA4FF'}}>
                                        - 제공해주신 private key는 거래 컨트랙트 배포, 컨트랙트 접근에 사용됩니다.
                                    </Typography>
                                    <Typography fontSize={14} sx={{ color: '#4AA4FF'}}>
                                        - 목적 이외의 용도로는 절대 사용되지 않으며, 비밀키는 여러 보안기술(SGX, key 암호화, hash function)들을
                                        <br/>&nbsp;&nbsp;&nbsp;통해 안전하게 보호됩니다! 
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </StyledBox>
                </Box>
            </Box>
            <Box 
                sx={{ 
                    position: 'sticky',
                    bottom: '0',
                    display: 'flex', 
                    justifyContent: 'center',
                    height: '90px',
                    borderTop: '1px solid #EEEEEE',
                    backgroundColor: '#FAFAFD'
                }}
            >
                <Box 
                    sx={{ 
                        width: '1024px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'end'
                    }}
                >
                    <Button
                        sx={{ 
                            width: '160px', height: '60px', backgroundColor: '#FF5058',
                            '&:hover': {
                                backgroundColor: '#FF3A44'
                            }
                        }}
                        onClick={handleSignUp}
                    >
                        <Typography color={'white'} fontSize={'20px'}>가입하기</Typography>
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
        
    );
}

export default Signup;