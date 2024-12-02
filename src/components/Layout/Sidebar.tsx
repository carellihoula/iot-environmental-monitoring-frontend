import styled from "styled-components";
import { useMenuContext } from "../../context/MenuContext";
import { IMenu } from "../../interface_types/interface";
import ensim_logo from "/images/ensim-logo.png";

interface SidebarProps {
  list: IMenu[];
}

const Sidebar: React.FC<SidebarProps> = ({ list }) => {
  const { selectedMenu, setSelectedMenu } = useMenuContext();
  return (
    <Container>
      <LogoEnsim>
        <img src={ensim_logo} alt="logo ensim" width={50} height={50} />
        <h1 className="raleway-bold">ENSIM IOT</h1>
      </LogoEnsim>

      {list.map((item) => (
        <MenuItem
          key={item.id}
          onClick={() => setSelectedMenu(item)}
          $isSelected={selectedMenu?.id === item.id}
        >
          {<item.icon size={24} color="#FFF" />}
          <p className="title raleway-bold">{item.title}</p>
        </MenuItem>
      ))}
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  border-right: 0.5px solid #818080;
  width: 15%;
`;

const MenuItem = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  gap: 10px;
  background: ${(props) => props.$isSelected && "#252525"};

  &:hover {
    background-color: #252525;
    cursor: pointer;
    border: 10px;
  }
  .title {
    color: #fff;
    font-size: 1.2rem;
    //font-size: "Raleway", sans-serif;
  }
`;

const LogoEnsim = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  //background: red;
  margin-bottom: 50px;
  h1 {
    color: #fff;
    text-align: center;
  }
`;
