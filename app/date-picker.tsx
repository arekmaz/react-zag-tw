import * as datepicker from '@zag-js/date-picker';
import { useMachine, normalizeProps, Portal, mergeProps } from '@zag-js/react';
import { ComponentProps, useId } from 'react';
import { createHookContext } from './machine-ctx';

export const [useDatePicker, DatePickerProvider, DatePickerContext] =
  createHookContext((ctx: datepicker.Context) => {
    const [state, send] = useMachine(datepicker.machine(ctx));

    const api = datepicker.connect(state, send, normalizeProps);

    return api;
  });

export const DatePickerConsumer = DatePickerContext.Consumer;

export const DatePickerControl = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useDatePicker().getControlProps(), props)} />
);

export const DatePickerInput = (props: ComponentProps<'input'>) => (
  <input {...mergeProps(useDatePicker().getInputProps(), props)} />
);

export const DatePickerTrigger = (props: ComponentProps<'button'>) => (
  <button {...mergeProps(useDatePicker().getTriggerProps(), props)} />
);

export const DatePickerPositioner = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useDatePicker().getPositionerProps(), props)} />
);

export const DatePickerContent = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useDatePicker().getContentProps(), props)} />
);

export const DatePickerViewControl = ({
  view,
  ...props
}: ComponentProps<'div'> & datepicker.ViewProps) => (
  <div {...mergeProps(useDatePicker().getViewControlProps({ view }), props)} />
);

export const DatePickerPrevTrigger = ({
  view,
  ...props
}: ComponentProps<'button'> & datepicker.ViewProps) => (
  <button
    {...mergeProps(useDatePicker().getPrevTriggerProps({ view }), props)}
  />
);

export const DatePickerViewTrigger = ({
  view,
  ...props
}: ComponentProps<'button'> & datepicker.ViewProps) => (
  <button
    {...mergeProps(useDatePicker().getViewTriggerProps({ view }), props)}
  />
);

export const DatePickerNextTrigger = ({
  view,
  ...props
}: ComponentProps<'button'> & datepicker.ViewProps) => (
  <button
    {...mergeProps(useDatePicker().getNextTriggerProps({ view }), props)}
  />
);

export const DatePickerTable = ({
  view,
  ...props
}: ComponentProps<'table'> & datepicker.TableProps) => (
  <table {...mergeProps(useDatePicker().getTableProps({ view }), props)} />
);

export const DatePickerTableHeader = ({
  view,
  ...props
}: ComponentProps<'thead'> & datepicker.TableProps) => (
  <thead
    {...mergeProps(useDatePicker().getTableHeaderProps({ view }), props)}
  />
);

export const DatePickerTableRow = ({
  view,
  ...props
}: ComponentProps<'tr'> & datepicker.TableProps) => (
  <tr {...mergeProps(useDatePicker().getTableRowProps({ view }), props)} />
);

export const DatePickerTableBody = ({
  view,
  ...props
}: ComponentProps<'tbody'> & datepicker.TableProps) => (
  <tbody {...mergeProps(useDatePicker().getTableBodyProps({ view }), props)} />
);

export const DatePickerDayTableCell = ({
  value,
  ...props
}: ComponentProps<'td'> & datepicker.DayTableCellProps) => (
  <td {...mergeProps(useDatePicker().getDayTableCellProps({ value }), props)} />
);

export const DatePickerDayTableCellTrigger = ({
  value,
  ...props
}: ComponentProps<'div'> & datepicker.DayTableCellProps) => (
  <div
    {...mergeProps(
      useDatePicker().getDayTableCellTriggerProps({ value }),
      props
    )}
  />
);

export const DatePickerMonthTableCell = ({
  disabled,
  value,
  columns,
  ...props
}: ComponentProps<'td'> & datepicker.TableCellProps) => (
  <td
    {...mergeProps(
      useDatePicker().getMonthTableCellProps({ disabled, value, columns }),
      props
    )}
  />
);

export const DatePickerMonthTableCellTrigger = ({
  disabled,
  value,
  columns,
  ...props
}: ComponentProps<'div'> & datepicker.TableCellProps) => (
  <div
    {...mergeProps(
      useDatePicker().getMonthTableCellTriggerProps({
        disabled,
        value,
        columns,
      }),
      props
    )}
  />
);

function DatePicker() {
  return (
    <>
      <DatePickerControl>
        <DatePickerInput />
        <DatePickerTrigger>🗓</DatePickerTrigger>
      </DatePickerControl>

      <Portal>
        <DatePickerPositioner>
          <DatePickerConsumer>
            {(api) => (
              <DatePickerContent>
                {/*  Day View  */}
                <div hidden={api.view !== 'day'}>
                  <DatePickerViewControl view="year">
                    <DatePickerPrevTrigger>Prev</DatePickerPrevTrigger>
                    <DatePickerViewTrigger>
                      {api.visibleRangeText.start}
                    </DatePickerViewTrigger>
                    <DatePickerNextTrigger>Next</DatePickerNextTrigger>
                  </DatePickerViewControl>

                  <DatePickerTable view="day">
                    <DatePickerTableHeader view="day">
                      <DatePickerTableRow view="day">
                        {api.weekDays.map((day, i) => (
                          <th scope="col" key={i} aria-label={day.long}>
                            {day.narrow}
                          </th>
                        ))}
                      </DatePickerTableRow>
                    </DatePickerTableHeader>
                    <DatePickerTableBody view="day">
                      {api.weeks.map((week, i) => (
                        <DatePickerTableRow key={i} view="day">
                          {week.map((value, i) => (
                            <DatePickerDayTableCell key={i} value={value}>
                              <DatePickerDayTableCellTrigger value={value}>
                                {value.day}
                              </DatePickerDayTableCellTrigger>
                            </DatePickerDayTableCell>
                          ))}
                        </DatePickerTableRow>
                      ))}
                    </DatePickerTableBody>
                  </DatePickerTable>
                </div>

                {/*  Month View  */}
                <div hidden={api.view !== 'month'}>
                  <DatePickerViewControl view="month">
                    <DatePickerPrevTrigger view="month">
                      Prev
                    </DatePickerPrevTrigger>
                    <DatePickerViewTrigger view="month">
                      {api.visibleRange.start.year}
                    </DatePickerViewTrigger>
                    <DatePickerNextTrigger view="month">
                      Next
                    </DatePickerNextTrigger>
                  </DatePickerViewControl>

                  <DatePickerTable view="month" columns={4}>
                    <DatePickerTableBody view="month">
                      {api
                        .getMonthsGrid({ columns: 4, format: 'short' })
                        .map((months, row) => (
                          <DatePickerTableRow key={row}>
                            {months.map((month, index) => (
                              <DatePickerMonthTableCell
                                {...month}
                                columns={4}
                                key={index}
                              >
                                <DatePickerMonthTableCellTrigger
                                  {...month}
                                  columns={4}
                                >
                                  {month.label}
                                </DatePickerMonthTableCellTrigger>
                              </DatePickerMonthTableCell>
                            ))}
                          </DatePickerTableRow>
                        ))}
                    </DatePickerTableBody>
                  </DatePickerTable>
                </div>

                {/*  Year View  */}
                <div hidden={api.view !== 'year'}>
                  <div {...api.getViewControlProps({ view: 'year' })}>
                    <button {...api.getPrevTriggerProps({ view: 'year' })}>
                      Prev
                    </button>
                    <span>
                      {api.getDecade().start} - {api.getDecade().end}
                    </span>
                    <button {...api.getNextTriggerProps({ view: 'year' })}>
                      Next
                    </button>
                  </div>

                  <table {...api.getTableProps({ view: 'year', columns: 4 })}>
                    <tbody {...api.getTableBodyProps()}>
                      {api.getYearsGrid({ columns: 4 }).map((years, row) => (
                        <tr
                          key={row}
                          {...api.getTableRowProps({ view: 'year' })}
                        >
                          {years.map((year, index) => (
                            <td
                              key={index}
                              {...api.getYearTableCellProps({
                                ...year,
                                columns: 4,
                              })}
                            >
                              <div
                                {...api.getYearTableCellTriggerProps({
                                  ...year,
                                  columns: 4,
                                })}
                              >
                                {year.label}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </DatePickerContent>
            )}
          </DatePickerConsumer>
        </DatePickerPositioner>
      </Portal>
    </>
  );
}
