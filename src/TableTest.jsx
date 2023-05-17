import React, { Component } from "react";
import { Table, Pagination, Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "./TableTest.css";

let searchText;
let searchedColumn;
let searchInput;

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  searchText = selectedKeys[0];
  searchedColumn = dataIndex;
  console.log("value", selectedKeys);
  console.log("value1", dataIndex);
};

const handleReset = (clearFilters) => {
  clearFilters();
  searchText = "";
};

const getColumnSearchProps = (dataIndex) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <div
      style={{
        padding: 8,
      }}
    >
      <Input
        ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{
          marginBottom: 8,
          display: "block",
        }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{
            width: 90,
          }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{
            width: 90,
          }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({
              closeDropdown: false,
            });
            searchText = selectedKeys[0];
            searchedColumn = dataIndex;
          }}
        >
          Filter
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined
      style={{
        color: filtered ? "#1890ff" : undefined,
      }}
    />
  ),

  onFilter: (value, record) =>
    record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  onFilterDropdownVisibleChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  },
  render: (text) =>
    searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{
          backgroundColor: "#ffc069",
          padding: 0,
        }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ""}
      />
    ) : (
      text
    ),
});

export default class TableTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: [],
      pageSize: 15,
      pageNo: 1,
      total: 0,
      params: {
        plant: ["B1", "B2"],
        workcenter: ["1", "2", "3", "4"],
        wo: "",
        partnumber: "",
      },
    };
  }

  fetchData = (params = {}) => {
    console.log(params);
    this.setState({ params: params }, () => {
      this.props.OnChange(1, 26, this.state.params);
    });
  };

  handleTableChange = (newPagination, filters, sorter) => {
    this.fetchData({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination: newPagination,
      ...filters,
    });
  };

  onChange = (pageNumber, pageSize) => {
    this.props.OnChange(pageNumber, pageSize, this.state.params);
  };

  componentWillUnmount() {}
  componentDidMount() {
    this.columns = [
      {
        title: "工单",
        dataIndex: "wo",
        align: "center",
        width: "7%",
        key: "wo",
        ...getColumnSearchProps("wo"),
      },
      {
        title: "工单数量",
        dataIndex: "woquantity",
        width: "5%",
        align: "center",
        key: "woquantity",
      },
      {
        title: "入库总数量",
        dataIndex: "storageQyt",
        width: "7%",
        align: "center",
        key: "storageQyt",
      },
      {
        title: "在库总数量",
        dataIndex: "inventoryQyt",
        width: "7%",
        align: "center",
        key: "inventoryQyt",
      },
      {
        title: "P/N",
        dataIndex: "partnumber",
        width: "9%",
        align: "center",
        key: "partnumber",
        ...getColumnSearchProps("partnumber"),
      },
      {
        title: "存放位置",
        dataIndex: "location",
        width: "5%",
        align: "center",
        key: "location",
      },
      {
        title: "入库数量",
        dataIndex: "availablequantity",
        width: "5%",
        align: "center",
        key: "availablequantity",
      },
      {
        title: "交接单号码",
        dataIndex: "uid",
        width: "8%",
        align: "left",
        key: "uid",
      },
      {
        title: "工作中心",
        dataIndex: "workcenter",
        filters: [
          {
            text: "SMT",
            value: "1",
          },
          {
            text: "COB",
            value: "2",
          },
          {
            text: "MI",
            value: "3",
          },
          {
            text: "Casing",
            value: "4",
          },
        ],
        width: "8%",
        align: "left",
        key: "workcenter",
      },
      {
        title: "工厂",
        dataIndex: "plant",
        filters: [
          {
            text: "B1",
            value: "B1",
          },
          {
            text: "B2",
            value: "B2",
          },
        ],
        width: "8%",
        align: "left",
        key: "plant",
      },
      {
        title: "存放人",
        dataIndex: "createuser",
        width: "8%",
        align: "center",
        key: "createuser",
      },
      {
        title: "存放日期",
        dataIndex: "createtime",
        width: "20%",
        align: "center",
        key: "createtime",
      },
    ];
    console.log(99999, this.state.params);
    this.props.OnChange(1, 26, this.state.params);
  }

  render() {
    const { DataInfoList, Totle } = this.props;
    return (
      <div className="tableTestContent">
        <Table
          columns={this.columns}
          dataSource={DataInfoList}
          size="small"
          pagination={false}
          className="tablestyle"
          onChange={this.handleTableChange}
        />
        <Pagination
          style={{
            paddingTop: "10%"
          }}
          total={Totle}
          showSizeChanger
          showQuickJumper
          defaultPageSize={20}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
