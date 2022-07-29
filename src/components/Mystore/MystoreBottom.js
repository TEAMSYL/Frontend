import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MyProducts from "./Section/MyProducts.js";
import Test2 from "./Section/test2";
import Test3 from "./Section/test3";
import Test4 from "./Section/test4";
import Test5 from "./Section/test5";
import Test6 from "./Section/test6";


const  MystoreBottom = ({userId}) => {
    const tabMenuList = [
        "상품",
        "찜",
        "상점후기",
      ];
    const [tabMenu, setTabMenu] = useState(0);
    const onClickTabMenu = (e) => {
        const tabIndex = e.target.value;
        setTabMenu(tabIndex);
      };

    return (
        <Box sx={{width:'1024px', margin:'0 auto 100px', padding:'0px'}}>
            <TabMenu>
                <ul>
                {tabMenuList &&
                    tabMenuList.map((menu, index) => (
                    <>
                        {true ? (
                        <li
                            className={tabMenu === index && "active"}
                            onClick={onClickTabMenu}
                            value={index}
                        >
                            {menu}
                        </li>
                        ) : (
                        index !== 2 && (
                            <li
                            className={tabMenu === index && "active"}
                            onClick={onClickTabMenu}
                            value={index}
                            >
                            {menu}
                            </li>
                        )
                        )}
                    </>
                    ))}
                </ul>
            </TabMenu>
            <TabContent>
                {tabMenu === 0 && <MyProducts userId={userId}/>}
                {tabMenu === 1 && <Test2 />}
                {tabMenu === 2 && <Test3 />}
            </TabContent>
        </Box>
    );
};


const TabMenu = styled.div`
  //border: 1px solid black;
  width: 1024px;
  & ul {
    padding-left: 0px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  & li {
    display: flex;
    font-size: 14px;
    color: #999999;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 100%;
    height: 100%;
    border: 1px solid #eeeeee;
    border-bottom: 1px solid black;
  }
  & .active {
    color: #000000;
    font-weight: 800;
    border: 1px solid black;
    border-width: 1px 1px 0 1px;
    border-bottom: 1px solid #ffffff;
  }
`;

const TabContent = styled.div`
  margin-top: 64px;
  & h3 {
    font-weight: 400;
    padding: 0;
  }
  & hr {
    border: 1px solid #eeeeee;
    margin: 24px 0 24px 0;
  }
`;
export default MystoreBottom;