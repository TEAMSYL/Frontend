import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ProductCall from './Section/ProductCall';
import ProductInfo from './Section/ProductInfo';

const BottomLeft = ({ product, user }) => {
  const tabMenuList = ['상품정보', '상품문의'];
  const [tabMenu, setTabMenu] = useState(0);
  const onClickTabMenu = e => {
    const tabIndex = e.target.value;
    setTabMenu(tabIndex);
  };

  return (
    <Box>
      <TabMenu>
        <ul>
          {tabMenuList &&
            tabMenuList.map((menu, index) => (
              <>
                {true ? (
                  <li
                    className={tabMenu === index && 'active'}
                    onClick={onClickTabMenu}
                    value={index}
                  >
                    {menu}
                  </li>
                ) : (
                  index !== 1 && (
                    <li
                      className={tabMenu === index && 'active'}
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
        {tabMenu === 0 && <ProductInfo product={product} />}
        {tabMenu === 1 && <ProductCall product={product} user={user} />}
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

export default BottomLeft;
