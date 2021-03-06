import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Pane from './pane';
import * as types from '../types';

const styles = StyleSheet.create({
  mainCol: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
  },
  topThreeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  bottomTwoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  topSecondCol: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

const SchedulePane = ({
  BANDWIDTH,
  style,
  values,
  currentPane,
  onPaneChange,
  onAdd,
  onEdit,
  onDelete,
  isEditable,
}) => (
  <Pane
    BANDWIDTH={BANDWIDTH}
    style={style}
    type={types.SCHEDULE}
    value={values[types.SCHEDULE]}
    onPress={() => onPaneChange(types.SCHEDULE)}
    onAdd={onAdd}
    onEdit={onEdit}
    onDelete={onDelete}
    isCurrent={currentPane === types.SCHEDULE}
    isEditable={isEditable}
  />
);

const GoalsPane = ({
  BANDWIDTH,
  style,
  values,
  currentPane,
  onPaneChange,
  onAdd,
  onEdit,
  onDelete,
  isEditable,
}) => (
  <Pane
    BANDWIDTH={BANDWIDTH}
    style={style}
    type={types.GOALS}
    value={values[types.GOALS]}
    onPress={() => onPaneChange(types.GOALS)}
    onAdd={onAdd}
    onEdit={onEdit}
    onDelete={onDelete}
    isCurrent={currentPane === types.GOALS}
    isEditable={isEditable}
  />
);

const MotivationPane = ({
  BANDWIDTH,
  style,
  values,
  currentPane,
  onPaneChange,
  onAdd,
  onEdit,
  onDelete,
  isEditable,
}) => (
  <Pane
    BANDWIDTH={BANDWIDTH}
    style={style}
    type={types.MOTIVATION}
    value={values[types.MOTIVATION]}
    onPress={() => onPaneChange(types.MOTIVATION)}
    onAdd={onAdd}
    onEdit={onEdit}
    onDelete={onDelete}
    isCurrent={currentPane === types.MOTIVATION}
    isEditable={isEditable}
  />
);

const HappinessPane = ({
  BANDWIDTH,
  style,
  values,
  currentPane,
  onPaneChange,
  onAdd,
  onEdit,
  onDelete,
  isEditable,
}) => (
  <Pane
    BANDWIDTH={BANDWIDTH}
    style={style}
    type={types.HAPPINESS}
    value={values[types.HAPPINESS]}
    onPress={() => onPaneChange(types.HAPPINESS)}
    onAdd={onAdd}
    onEdit={onEdit}
    onDelete={onDelete}
    isCurrent={currentPane === types.HAPPINESS}
    isEditable={isEditable}
  />
);

const TodoPane = ({
  BANDWIDTH,
  style,
  values,
  currentPane,
  onPaneChange,
  onAdd,
  onEdit,
  onDelete,
  onCheckedToggle,
  isEditable,
}) => (
  <Pane
    BANDWIDTH={BANDWIDTH}
    style={style}
    type={types.TODO}
    value={values[types.TODO]}
    onPress={() => onPaneChange(types.TODO)}
    onAdd={onAdd}
    onEdit={onEdit}
    onDelete={onDelete}
    onCheckedToggle={onCheckedToggle}
    isCurrent={currentPane === types.TODO}
    isEditable={isEditable}
  />
);

export default class Panels extends Component {
  constructor(props) {
    super(props);
    const { topOffset } = props;
    this.state = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height - topOffset,
    };
  }

  componentDidMount() {
    const { topOffset } = this.props;
    Dimensions.addEventListener('change', () => {
      this.setState({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - topOffset,
      });
    });
  }

  render() {
    const {
      currentPane,
      onPaneChange,
      values,
      onAdd,
      onEdit,
      onDelete,
      onCheckedToggle,
      isEditable,
    } = this.props;
    const { width, height } = this.state;
    const BANDWIDTH = Math.min(
      height,
      width,
    ) / 6;
    const isTopRowPanesActive = [
      types.SCHEDULE,
      types.GOALS,
      types.MOTIVATION,
    ].includes(currentPane);
    const isLeftColPanesActive = [
      types.SCHEDULE,
      types.TODO,
    ].includes(currentPane);
    return (
      <View style={styles.mainCol}>
        <View
          style={[
            styles.topThreeRow,
            {
              height: isTopRowPanesActive
                ? height - BANDWIDTH
                : (BANDWIDTH * 2),
            },
          ]}
        >
          <SchedulePane
            BANDWIDTH={BANDWIDTH}
            currentPane={currentPane}
            onPaneChange={onPaneChange}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
            values={values}
            isEditable={isEditable}
            style={{
              height: !isTopRowPanesActive
                ? (BANDWIDTH * 2)
                : height - BANDWIDTH,
              width: isLeftColPanesActive
                ? width - BANDWIDTH
                : BANDWIDTH,
            }}
          />
          <View
            style={[
              styles.topSecondCol,
              {
                width: !isLeftColPanesActive
                  ? width - BANDWIDTH
                  : BANDWIDTH,
              },
            ]}
          >
            <GoalsPane
              BANDWIDTH={BANDWIDTH}
              currentPane={currentPane}
              onPaneChange={onPaneChange}
              onAdd={onAdd}
              onEdit={onEdit}
              onDelete={onDelete}
              values={values}
              isEditable={isEditable}
              style={{
                height: currentPane !== types.GOALS // eslint-disable-line no-nested-ternary
                  ? currentPane === types.SCHEDULE
                    ? (height - BANDWIDTH) / 2
                    : BANDWIDTH
                  : height - (BANDWIDTH * 2),
                width: !isLeftColPanesActive
                  ? width - BANDWIDTH
                  : BANDWIDTH,
              }}
            />
            <MotivationPane
              BANDWIDTH={BANDWIDTH}
              currentPane={currentPane}
              onPaneChange={onPaneChange}
              onAdd={onAdd}
              onEdit={onEdit}
              onDelete={onDelete}
              values={values}
              isEditable={isEditable}
              style={{
                height: currentPane !== types.MOTIVATION // eslint-disable-line no-nested-ternary
                  ? currentPane === types.SCHEDULE
                    ? (height - BANDWIDTH) / 2
                    : BANDWIDTH
                  : height - (BANDWIDTH * 2),
                width: !isLeftColPanesActive
                  ? width - BANDWIDTH
                  : BANDWIDTH,
              }}
            />
          </View>
        </View>
        <View
          style={[
            styles.bottomTwoRow,
            {
              height: !isTopRowPanesActive
                ? height - (BANDWIDTH * 2)
                : BANDWIDTH,
            },
          ]}
        >
          <TodoPane
            BANDWIDTH={BANDWIDTH}
            currentPane={currentPane}
            onPaneChange={onPaneChange}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
            onCheckedToggle={onCheckedToggle}
            values={values}
            isEditable={isEditable}
            style={{
              height: isTopRowPanesActive
                ? BANDWIDTH
                : height - (BANDWIDTH * 2),
              width: isLeftColPanesActive
                ? width - BANDWIDTH
                : BANDWIDTH,
            }}
          />
          <HappinessPane
            BANDWIDTH={BANDWIDTH}
            currentPane={currentPane}
            onPaneChange={onPaneChange}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
            values={values}
            isEditable={isEditable}
            style={{
              height: isTopRowPanesActive
                ? BANDWIDTH
                : height - (BANDWIDTH * 2),
              width: !isLeftColPanesActive
                ? width - BANDWIDTH
                : BANDWIDTH,
            }}
          />
        </View>
      </View>
    );
  }
}
