import React, { Component } from "react";
import { Table, Pagination, Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "./TableVn.css";

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
      // params:['params1':{plant:'',workcenter:''}]
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
        title: "Công đơn",
        dataIndex: "wo",
        align: "center",
        width: "7%",
        key: "wo",
        ...getColumnSearchProps("wo"),
      },
      {
        title: "Số lượng công đơn",
        dataIndex: "woquantity",
        width: "6%",
        align: "center",
        key: "woquantity",
      },
      {
        title: "Tổng số lượng vào kho",
        dataIndex: "storageQyt",
        width: "8%",
        align: "center",
        key: "storageQyt",
      },
      {
        title: "Tổng số lượng trong kho",
        dataIndex: "inventoryQyt",
        width: "8%",
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
        title: "Vị trí lưu trữ",
        dataIndex: "location",
        width: "5%",
        align: "center",
        key: "location",
      },
      {
        title: "số lượng vào kho",
        dataIndex: "availablequantity",
        width: "5%",
        align: "center",
        key: "availablequantity",
      },
      {
        title: "Mã Số phiếu bàn giao",
        dataIndex: "uid",
        width: "8%",
        align: "left",
        key: "uid",
      },
      {
        title: "Trung tâm làm việc",
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
        width: "6%",
        align: "left",
        key: "workcenter",
      },
      {
        title: "nhà máy",
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
        width: "6%",
        align: "left",
        key: "plant",
      },
      {
        title: "người lưu",
        dataIndex: "createuser",
        width: "8%",
        align: "center",
        key: "createuser",
      },
      {
        title: "ngày lưu trữ",
        dataIndex: "createtime",
        width: "20%",
        align: "center",
        key: "createtime",
      },
    ];
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
            marginTop: "10.5%"
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
