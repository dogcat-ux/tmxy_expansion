import React, {useEffect, useState} from "react";
import Auth from "../../components/auth";
import {activityApplied, allScore, allScorePost, rank, semesterList, yearList} from "../../api/user";
import {useNavigate} from "react-router-dom";
import EmptyBox from "../../components/emptyBox";
import {Avatar, Card, Image, List, Space} from "antd-mobile";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {AddCircleOutline} from 'antd-mobile-icons';
import CommonHeader from "../../components/CommonHeader";
import {Table} from "antd";

const columns: Array<{ title: string, dataIndex: string, key: string }> = [
  {
    title: '活动名称',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '类型',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: '分数',
    dataIndex: 'score',
    key: 'score',
  },
]
const columns2: Array<{ title: string, dataIndex: string, key: string }> = [
  {
    title: '加分名称',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '分数',
    dataIndex: 'score',
    key: 'score',
  },
]
const columns3: Array<{ title: string, dataIndex: string, key: string }> = [
  {
    title: '减分原因',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '分数',
    dataIndex: 'score',
    key: 'score',
  },
]
const CumulativeScore: React.FC = () => {
  const [items, setItems] = useState<API.rankResItem[]>([]);
  const [items1, setItems1] = useState<API.rankResItem[]>([]);
  const [items2, setItems2] = useState<API.rankResItem[]>([]);
  const [score, setScore] = useState<number>();
  const [years, setYears] = useState<string[]>();
  const [semesters, setSemesters] = useState<string[]>();
  const [year, setYear] = useState<string>();
  const [semester, setSemester] = useState<string>();
  const sendApi = async (key?: number) => {
    const [allScoreRes, res, years] = await Promise.all([allScore(), allScorePost(), yearList()])
    allScoreRes?.data&&setScore(allScoreRes?.data);
    res?.data?.activity&&setItems(res?.data?.activity);
    res?.data?.extra_add&&setItems1(res?.data?.extra_add);
    res?.data?.extra_deduction&&setItems2(res?.data?.extra_deduction);
    setYears(years?.data?.item?.map((value: API.YearListResItem) => value?.year?.toString()))
  }
  useEffect(() => {
    sendApi()
  }, [])
  useEffect(() => {
    sendApi()
  }, [year,semesters])
  useEffect(() => {
    year && semesterList({year}).then(res => {
      setSemesters(res?.data?.item?.map((value: API.SemesterListResItem) => value?.semester_name?.toString()))
    })
  }, [year])
  return <Auth title={"累计分数明细"} isBack>
    <CommonHeader
      handleSemesterConfirmProp={(data) => {
        setSemester(data[0])
      }}
      handleYearConfirmProp={(data) => {
        setYear(data[0])
      }}
      score={score?.toString() || '0'}
      yearInfo={
        {
          yearList: [years || []],
          semesterList: [semesters || []],
          year: year || '全部学年',
          semester: semester || '全部学期',
        }}>
    </CommonHeader>

    <div>
      <Card title={
          <>
            <AddCircleOutline color="var(--adm-color-primary)"/>
            <span style={{marginLeft: '2px'}}>活动加分</span>
          </>
        }
      >
        <Table dataSource={items||[]} columns={columns} pagination={false}  scroll={{ x: 375, y: 300 }}/>
      </Card>
      <Card
        title={
          <>
            <AddCircleOutline color="var(--adm-color-primary)"/>
            <span style={{marginLeft: '2px'}}>额外加分</span>
          </>
        }>
        <Table dataSource={items1||[]}  columns={columns2} pagination={false}  scroll={{ x: 375, y: 300 }}/>
      </Card>
      <Card
        title={
          <>
            <AddCircleOutline color="var(--adm-color-primary)"/>
            <span style={{marginLeft: '2px'}}>额外减分</span>
          </>
        }>
        <Table dataSource={items2||[]} columns={columns3} pagination={false}  scroll={{ x: 375, y: 300 }}/>
      </Card>
    </div>
  </Auth>
}
export default CumulativeScore;
