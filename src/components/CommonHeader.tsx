import React, { useEffect, useState } from 'react';
import "../assets/styles/components/commonHeader.scss"
import { Grid, Picker, Tag } from 'antd-mobile';
import { Space } from 'antd-mobile';
import { DownFill } from 'antd-mobile-icons';
import {useSelector} from "react-redux";
import {RootState} from "../store";

interface HeaderProps {
  score: string;
  yearInfo: {
    yearList: Array<string[]>;
    semesterList: Array<string[]>;
    year: string;
    semester: string;
  };
  handleYearConfirmProp: (v: any) => void;
  handleSemesterConfirmProp: (v: any) => void;
}

const CommonHeader: React.FC<HeaderProps> = ({score,
                                               yearInfo,
                                               handleYearConfirmProp,
                                               handleSemesterConfirmProp,
                                             }) => {
  const { yearList, semesterList, year, semester } = yearInfo;
  const [visible, setVisible] = useState(false);
  const [isYearActive, setIsYearActive] = useState(false);
  const [isSemesterActive, setIsSemesterActive] = useState(false);
  const [semesterVisible, setSemesterVisible] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const handleYearDropClick = () => {
    setVisible(true);
    setIsYearActive(true);
  };
  const handleSemesterDropClick = () => {
    setSemesterVisible(true);
    setIsSemesterActive(true);
  };
  const handleYearConfirm = (v: any) => {
    setVisible(false);
    setIsYearActive(false);
    handleYearConfirmProp(v);
  };
  const handleSemesterConfirm = (v: any) => {
    setSemesterVisible(false);
    setIsSemesterActive(false);
    handleSemesterConfirmProp(v);
  };
  return (
    <div className="scoped">
      <Grid columns={1} gap={8}>
        <Grid.Item>
          <Space>
            <div className="my-adm-dropdown">
              <div className="my-adm-dropdown-nav">
                <div
                  className={
                    isYearActive
                      ? 'my-adm-dropdown-item my-adm-dropdown-item-active'
                      : 'my-adm-dropdown-item'
                  }
                  onClick={handleYearDropClick}
                >
                  <div
                    className={
                      isYearActive
                        ? 'my-adm-dropdown-item-title my-adm-dropdown-item-highlight'
                        : 'my-adm-dropdown-item-title'
                    }
                  >
                    <span className="my-adm-dropdown-item-title-text">
                      {year}
                    </span>
                    <span
                      className={
                        isYearActive
                          ? 'my-adm-dropdown-item-title-arrow my-adm-dropdown-item-title-arrow-active'
                          : 'my-adm-dropdown-item-title-arrow'
                      }
                    >
                      <DownFill fontSize={8} />
                    </span>
                  </div>
                </div>
                <div
                  className={
                    isSemesterActive
                      ? 'my-adm-dropdown-item my-adm-dropdown-item-active'
                      : 'my-adm-dropdown-item'
                  }
                  onClick={handleSemesterDropClick}
                >
                  <div
                    className={
                      isSemesterActive
                        ? 'my-adm-dropdown-item-title my-adm-dropdown-item-highlight'
                        : 'my-adm-dropdown-item-title'
                    }
                  >
                    <span className="my-adm-dropdown-item-title-text">
                      {semester}
                    </span>
                    <span
                      className={
                        isSemesterActive
                          ? 'my-adm-dropdown-item-title-arrow my-adm-dropdown-item-title-arrow-active'
                          : 'my-adm-dropdown-item-title-arrow'
                      }
                    >
                      <DownFill fontSize={8} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Space>
          <Picker
            columns={yearList}
            visible={visible}
            onClose={() => {
              setVisible(false);
              setIsYearActive(false);
            }}
            onConfirm={(v) => {
              handleYearConfirm(v);
            }}
          />
          <Picker
            columns={semesterList}
            visible={semesterVisible}
            onClose={() => {
              setSemesterVisible(false);
              setIsSemesterActive(false);
            }}
            onConfirm={(v) => {
              handleSemesterConfirm(v);
            }}
          />
          <div></div>
        </Grid.Item>
        <Grid.Item>
          <Space>
            <div className="gpa">累计分数 {score}</div>
          </Space>
        </Grid.Item>
      </Grid>
    </div>
  );
};
export default CommonHeader;
