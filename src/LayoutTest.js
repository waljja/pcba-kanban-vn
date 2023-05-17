import { React, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Breadcrumb, Layout, DatePicker, Space } from "antd";
import { Button, Popover } from "antd";
import "./testdate.css";
import logoV from "./img/HTLOG1.png";
import TableTest from "./TableTest";
import { GetBlogV2 } from "./api";
import "moment/locale/zh-cn";
import locale from "antd/lib/locale/zh_CN";

import { DownloadOutlined, GlobalOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
const { Content, Footer } = Layout;
const content = <div></div>;

function LayoutTest() {
  const [dataInfo, setDataInfo] = useState({});
  const [pageIndex, setpageIndex] = useState();
  const [pageSize, setpageSize] = useState();
  const [params1, setParams1] = useState();
  const [starttime, setStartTime] = useState("");
  const [endtime, setEndTime] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      console.log("111dataInfo6666666666", pageIndex, pageSize);
      getDataListInfo(pageIndex, pageSize, params1);
    }, 20000);
    return () => clearInterval(id);
  });

  const getDataListInfo = (pageIndex, pageSize, params) => {
    console.log("123", params);
    setpageIndex(pageIndex);
    setpageSize(pageSize);
    setParams1(params);
    let param = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      params1: params,
      plant: JSON.stringify(params.plant),
      workcenter: JSON.stringify(params.workcenter),
      wo: JSON.stringify(params.wo),
      partnumber: JSON.stringify(params.partnumber),
    };
    console.log("param", param);
    GetBlogV2(param).then((dataInfo) => {
      if (dataInfo.code === 200) {
        console.log(dataInfo);
        setDataInfo(dataInfo);
        console.log("大袭击", dataInfo);
      }
    });
  };

  const onChange = (value, dateString) => {
    setStartTime(dateString[0]);
    setEndTime(dateString[1]);
  };

  return (
    <Layout className="layout">
      <Content
        style={{
          background: "rgb(0,102,153)",
          paddingTop: "5px",
          paddingBottom: "5px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "0px 0",
          }}
        ></Breadcrumb>
        <div className="logo">
          <img
            src={logoV}
            alt="没有找到图"
            style={{ width: "150px", height: "70px" }}
          ></img>
        </div>
        <div className="logo1">
          <Space direction="vertical" size={12}>
            <RangePicker
              onChange={onChange}
              locale={locale}
              placeholder={["开始日期", "结束日期"]}
            />
          </Space>
        </div>
        <div id="title">
          <h1>鸿通 PCBA 超市库存实时看板</h1>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            size="large"
            href={
              "http://172.22.9.61:8888/api/kanban-report/download?StartTime=" +
              starttime +
              "&EndTime=" +
              endtime
            }
            target={"_blank"}
          >
            export
          </Button>
        </div>
        <Button
          type="primary"
          icon={<GlobalOutlined />}
          size="large"
          target={"_blank"}
          style={{ marginRight: "20px" }}
        >
          <NavLink to="/pcba-kanban-vn" style={{ color: "white" }}>
            &ensp;change language
          </NavLink>
        </Button>
        <div>
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          <Popover content={content} title="Title" trigger="click">
            <Button id="ass">SMT在库批次数量：{dataInfo.smtnumber}</Button>
          </Popover>
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          <Popover content={content} title="Title" trigger="click">
            <Button id="ass">COB在库批次数量：{dataInfo.cobnumber}</Button>
          </Popover>
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          <Popover content={content} title="Title" trigger="click">
            <Button id="ass">MI在库批次数量：{dataInfo.minumber}</Button>
          </Popover>
        </div>
        <br />
        <div>
          <TableTest
            DataInfoList={dataInfo.data}
            Totle={dataInfo.total}
            OnChange={getDataListInfo}
          ></TableTest>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          paddingBottom: "1px",
          paddingTop: "10px",
        }}
      >
        <div>HONOR TONE LIMITED 2022 IT MAKING</div>
      </Footer>
    </Layout>
  );
}

export default LayoutTest;
