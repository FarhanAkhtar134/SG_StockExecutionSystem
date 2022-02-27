import React, { FunctionComponent } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Title, DashboardComponent } from "react-admin";

interface DashboardProps {
  title?: string;
  content?: string;
  props?: any;
}
const Dashboard: FunctionComponent<DashboardProps> = ({
  title,
  content,
  props,
}) => {
  return (
    <Card>
      <Title title={title} />
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default Dashboard;
