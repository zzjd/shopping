import { useState } from "react";
import "./App.css";
import {
  PageHeader,
  Button,
  List,
  Radio,
  Card,
  Avatar,
  Tooltip,
  message,
} from "antd";
import imgURL from "./img/img.png";
import Modal from "antd/lib/modal/Modal";
function App() {
  const [shopList, setShopList] = useState([
    {
      name:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      price: 1,
    },
    { name: "b", price: 100 },
    { name: "c", price: 2 },
    { name: "d", price: 100 },
    { name: "e", price: 3 },
    { name: "f", price: 100 },
    { name: "g", price: 100 },
    { name: "h", price: 100 },
  ]);
  const [shopCar, setShopCar] = useState([]);

  const [shopCarVisible, setShopCarVisible] = useState(false);
  const [type, setType] = useState("grid");
  const [total, setTotal] = useState(0);

  const { Meta } = Card;
  //查看购物车
  const handleShoppingCar = () => {
    setShopCarVisible(true);
  };

  //网格布局
  const gridStyle = {
    width: "33%",
    textAlign: "center",
    padding: 16,
  };

  //添加购物车商品
  const handleAddShop = (value) => {
    let flag = 0;
    for (let i = 0; i < shopCar.length; i++) {
      if (shopCar[i].name === value.name) {
        shopCar[i].number++;
        flag = 1;
        break;
      }
    }
    if (flag === 0) {
      shopCar.push({ name: value.name, price: value.price, number: 1 });
    }
    let addPrice = 0;
    shopCar.forEach((item) => {
      addPrice += item.price * item.number;
    });
    setTotal(addPrice);
  };

  //grid展示或者list展示
  const onTypeChange = (e) => {
    setType(e.target.value);
  };

  //购买商品
  const handleBuy = () => {
    setShopCar([]);
    setTotal(0);
    setShopCarVisible(false);
    message.success(`购买成功，花费${total}元`);
  };

  //取消查看购物车
  const handleCancel = () => {
    setShopCarVisible(false);
  };

  //删除购物车中商品
  const handleDel = (value) => {
    for (let i = 0; i < shopCar.length; i++) {
      if (value.name === shopCar[i].name) {
        shopCar.splice(i, 1);
        message.success(`商品 ${value.name} 从购物车删除成功`);
        setShopCarVisible(false);
        break;
      }
    }
  };

  return (
    <PageHeader
      className="site-page-header"
      title="购物天堂"
      extra={[
        <Radio.Group onChange={onTypeChange} value={type}>
          <Radio value="grid">网格</Radio>
          <Radio value="table">列表</Radio>
        </Radio.Group>,
        <Button key="1" type="primary" onClick={handleShoppingCar}>
          购物车
        </Button>,
      ]}
    >
      {type === "grid" ? (
        <Card>
          {shopList.map((item) => {
            return (
              <Card.Grid style={gridStyle} actions={[]}>
                <img alt="img" src={imgURL} />
                <div
                  style={{
                    marginTop: 8,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Tooltip placement="top" title={item.name}>
                    <Meta
                      style={{
                        marginLeft: 8,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                      title={item.name}
                    ></Meta>
                  </Tooltip>

                  <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <Meta
                      style={{ marginRight: 8 }}
                      title={`${item.price}元`}
                    ></Meta>
                    <Button onClick={() => handleAddShop(item)}>
                      加入购物车
                    </Button>
                  </div>
                </div>
              </Card.Grid>
            );
          })}
        </Card>
      ) : (
        <List
          dataSource={shopList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar size="large" shape="square" src={imgURL} />}
                title={item.name}
                description={item.price}
              />
              <Button onClick={() => handleAddShop(item)}>加入购物车</Button>
            </List.Item>
          )}
        ></List>
      )}
      <Modal
        title="购物车"
        visible={shopCarVisible}
        onOk={handleBuy}
        onCancel={handleCancel}
        okText="购买"
        cancelText="取消"
        forceRender={true}
        bodyStyle={{ paddingBottom: 0, paddingTop: 0 }}
      >
        <List
          dataSource={shopCar}
          renderItem={(item) => (
            <List.Item
              actions={[<Button onClick={() => handleDel(item)}>删除</Button>]}
            >
              <List.Item.Meta title={item.name}></List.Item.Meta>
              <div>
                {item.price}*{item.number}
              </div>
            </List.Item>
          )}
          footer={total !== 0 ? <div>总价：{total}</div> : null}
        ></List>
      </Modal>
    </PageHeader>
  );
}

export default App;
