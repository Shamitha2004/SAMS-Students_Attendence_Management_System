import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from "../Components/Header";

const NotifyParentCard = ({logout}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/notifyparentpage');
  };

  return (
    <>

    <Header logout={logout} />
    <Container className='mt-5'>
        <div className="d-flex justify-content-around ">
          <Button
            variant="secondary"
            size="lg"
            className="mr-5"
            onClick={() => {handleClick()}}
          >
            Compose Message
          </Button>
          <Button
            variant="warning"
            size="lg"
            onClick={() => navigate("/facultyinbox")}
            >
            Inbox ( Important, Primary )
          </Button>
          <Button
            variant="success"
            size="lg"
            onClick={() => navigate("/parentinbox",
              {
                state:{
                  parameter:'Sent Messages'
                }
              }
            )}
          >
            Sent Messages
          </Button>
        </div>
      </Container>
            </>
  );
};

export default NotifyParentCard;