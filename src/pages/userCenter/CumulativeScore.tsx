import React, {useEffect, useState} from "react";
import Auth from "../../components/auth";
import {allScore, allScorePost, rank, semesterList, yearList} from "../../api/user";
import {Card,} from "antd-mobile";
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
  const map = new Map()
  const [items, setItems] = useState<API.allScoreResPostItem[]>([]);
  const [items1, setItems1] = useState<API.allScoreResPostItem[]>([]);
  const [items2, setItems2] = useState<API.allScoreResPostItem[]>([]);
  const [score, setScore] = useState<number>();
  const [years, setYears] = useState<string[]>();
  const [yearsMap, setYearsMap] = useState<any>(map);
  const [semestersMap, setSemestersMap] = useState<any>(map);
  const [semesters, setSemesters] = useState<string[]>();
  const [year, setYear] = useState<string>();
  const [semester, setSemester] = useState<string>();
  const sendApi = async (key?: number) => {
    let [allScoreRes, years] = await Promise.all([allScore(), yearList()])
    const map = new Map()
    let res=null;
    if(yearsMap.has(year)&&!semestersMap.has(semester)) {
      res = await allScorePost({
        year_start_time_stamp: yearsMap.get(year)?.year_start_time,
        year_end_time_stamp: yearsMap.get(year)?.year_end_time,
      })
    }
    else if(yearsMap.has(year)&&semestersMap.has(semester)) {
      res=await allScorePost({
        year_start_time_stamp: yearsMap?.get(year)?.year_start_time,
        year_end_time_stamp: yearsMap?.get(year)?.year_end_time,
        semester_start_time_stamp: semestersMap?.get(semester)?.semester_start_time,
        semester_end_time_stamp: semestersMap?.get(semester)?.semester_end_time,
      });
    }
    else if(!yearsMap.has(year)&&semestersMap.has(semester)) {
      res=await allScorePost({
        semester_start_time_stamp: semestersMap?.get(semester)?.semester_start_time,
        semester_end_time_stamp: semestersMap?.get(semester)?.semester_end_time,
      });
    }
    else {
      res=await allScorePost()
    }
    allScoreRes?.data && setScore(allScoreRes?.data);
    res?.data?.activity && setItems(res?.data?.activity);
    res?.data?.extra_add && setItems1(res?.data?.extra_add);
    res?.data?.extra_deduction && setItems2(res?.data?.extra_deduction);
    setYears(["全部学年",...years?.data?.item?.map((value: API.YearListResItem) => value?.year?.toString())])
    years?.data?.item?.map((value: API.YearListResItem) => {
      map.set(value?.year?.toString(), {
        year_start_time: value?.year_start_time,
        year_end_time: value?.year_end_time
      })
      return map;
    })
    setYearsMap(map);
  }
  useEffect(() => {
    sendApi()
  }, [])
  useEffect(() => {
    sendApi()
  }, [semester])
  useEffect(() => {
    if(year!=="全部学年"){
      year && semesterList({year}).then(res => {
        setSemesters(["全部学期",...res?.data?.item?.map((value: API.SemesterListResItem) => value?.semester?.toString())])
        const map = new Map()
        res?.data?.item?.map((value: API.SemesterListResItem) => {
          map.set(value?.semester?.toString(), {
            semester_start_time: value?.semester_start_time,
            semester_end_time: value?.semester_end_time
          })
          return map;
        })
        setSemestersMap(map);
      })
    }
    sendApi()
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
        <Table dataSource={items || []} columns={columns} pagination={false} scroll={{x: 375, y: 300}}/>
      </Card>
      <Card
        title={
          <>
            <AddCircleOutline color="var(--adm-color-primary)"/>
            <span style={{marginLeft: '2px'}}>额外加分</span>
          </>
        }>
        <Table dataSource={items1 || []} columns={columns2} pagination={false} scroll={{x: 375, y: 300}}/>
      </Card>
      <Card
        title={
          <>
            <AddCircleOutline color="var(--adm-color-primary)"/>
            <span style={{marginLeft: '2px'}}>额外减分</span>
          </>
        }>
        <Table dataSource={items2 || []} columns={columns3} pagination={false} scroll={{x: 375, y: 300}}/>
      </Card>
    </div>
  </Auth>
}
export default CumulativeScore;
