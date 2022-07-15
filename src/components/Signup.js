import React from 'react';

import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';

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
    const handleIsValidId = () => {
        let idRegExp = /^[a-zA-z0-9]{8,16}$/;
        if (!idRegExp.test(id)) {
            setIdStateText('올바르지 않은 아이디 형식입니다!');
            setIdError(true);
            console.log('형식 오류')
            return;
        } else { // 서버로 중복확인 요청
            let isDuplicated = id === 'minkyu4626'; // 이부분 작성 필요
            if (isDuplicated) {
                setIdStateText('이미 존재하는 아이디입니다!');
                setIdError(true);
                return;
            }
        }
        setIdStateText('사용 가능한 아이디입니다!')
        setIdError(false);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        const pwRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/;
        if( !pwRegExp.test(e.target.value)) {
            setIsValidPw(false);
        } else {
            setIsValidPw(true);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', justifyContent: 'center', minWidth: '1024px'}}>
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
                    <StyledBox>
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
                    
                    <StyledBox>
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
                                <Box sx={{ height: '70px'}}>
                                    <TextField
                                        error={password == '' ? false :
                                               isValidPw ? false : true
                                        }
                                        hiddenLabel
                                        id='password-input'
                                        name='id'
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
                            </Grid>
                        </Grid>
                    </StyledBox>
                    
                    <StyledBox>
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
                                <TextField
                                    error={false}
                                    hiddenLabel
                                    id='password-input'
                                    name='id'
                                    placeholder='비밀번호를 재입력 해주세요.'
                                    type='password'
                                    size='small'
                                    color={'secondary'}
                                    sx={{ width: 250 }}
                                    helperText={''}
                                    onChange={()=>{}}
                                ></TextField>
                            </Grid>
                        </Grid>
                    </StyledBox>
                    <StyledBox>
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
                            </Grid>
                        </Grid>
                    </StyledBox>
                    <StyledBox>
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
                            </Grid>
                        </Grid>
                    </StyledBox>
                    <StyledBox>
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
                            </Grid>
                        </Grid>
                    </StyledBox>
                </Box>
            </Box>
        </ThemeProvider>
        
    );
}

export default Signup;