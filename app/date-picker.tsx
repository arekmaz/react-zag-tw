import * as datepicker from '@zag-js/date-picker';
import { useMachine, normalizeProps, Portal, mergeProps } from '@zag-js/react';
import { useId } from 'react';

export const DatePickerControl = ({ children, ...props }) => (
  <div {...mergeProps(useDatePicker().getControlProps(), props)}>
    {children}
  </div>
);

export const DatePickerInput = (props) => (
  <input {...mergeProps(useDatePicker().getInputProps(), props)} />
);

export const DatePickerTrigger = (props) => (
  <button {...mergeProps(useDatePicker().getTriggerProps(), props)}>🗓</button>
);

export const DatePickerPositioner = (props) => (
  <div {...mergeProps(useDatePicker().getPositionerProps(), props)} />
);

export const DatePickerContent = (props) => (
  <div {...mergeProps(useDatePicker().getContentProps(), props)}>
    {props.children}
  </div>
);

// Day View Component
const DayView = () => {
  const api = useDatePicker();
  return (
    <div hidden={api.view !== 'day'}>
      <div {...api.getViewControlProps({ view: 'year' })}>
        <button {...api.getPrevTriggerProps()}>Prev</button>
        <button {...api.getViewTriggerProps()}>
          {api.visibleRangeText.start}
        </button>
        <button {...api.getNextTriggerProps()}>Next</button>
      </div>

      <table {...api.getTableProps({ view: 'day' })}>
        <thead {...api.getTableHeaderProps({ view: 'day' })}>
          <tr {...api.getTableRowProps({ view: 'day' })}>
            {api.weekDays.map((day, i) => (
              <th scope="col" key={i} aria-label={day.long}>
                {day.narrow}
              </th>
            ))}
          </tr>
        </thead>
        <tbody {...api.getTableBodyProps({ view: 'day' })}>
          {api.weeks.map((week, i) => (
            <tr key={i} {...api.getTableRowProps({ view: 'day' })}>
              {week.map((value, i) => (
                <td key={i} {...api.getDayTableCellProps({ value })}>
                  <div {...api.getDayTableCellTriggerProps({ value })}>
                    {value.day}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Month View Component
const MonthView = () => {
  const api = useDatePicker();
  return (
    <div hidden={api.view !== 'month'}>
      <div {...api.getViewControlProps({ view: 'month' })}>
        <button {...api.getPrevTriggerProps({ view: 'month' })}>Prev</button>
        <button {...api.getViewTriggerProps({ view: 'month' })}>
          {api.visibleRange.start.year}
        </button>
        <button {...api.getNextTriggerProps({ view: 'month' })}>Next</button>
      </div>

      <table {...api.getTableProps({ view: 'month', columns: 4 })}>
        <tbody {...api.getTableBodyProps({ view: 'month' })}>
          {api
            .getMonthsGrid({ columns: 4, format: 'short' })
            .map((months, row) => (
              <tr key={row} {...api.getTableRowProps()}>
                {months.map((month, index) => (
                  <td
                    key={index}
                    {...api.getMonthTableCellProps({ ...month, columns: 4 })}
                  >
                    <div
                      {...api.getMonthTableCellTriggerProps({
                        ...month,
                        columns: 4,
                      })}
                    >
                      {month.label}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

// Year View Component
const YearView = () => {
  const api = useDatePicker();
  return (
    <div hidden={api.view !== 'year'}>
      <div {...api.getViewControlProps({ view: 'year' })}>
        <button {...api.getPrevTriggerProps({ view: 'year' })}>Prev</button>
        <span>
          {api.getDecade().start} - {api.getDecade().end}
        </span>
        <button {...api.getNextTriggerProps({ view: 'year' })}>Next</button>
      </div>

      <table {...api.getTableProps({ view: 'year', columns: 4 })}>
        <tbody {...api.getTableBodyProps()}>
          {api.getYearsGrid({ columns: 4 }).map((years, row) => (
            <tr key={row} {...api.getTableRowProps({ view: 'year' })}>
              {years.map((year, index) => (
                <td
                  key={index}
                  {...api.getYearTableCellProps({ ...year, columns: 4 })}
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
  );
};

export function DatePicker() {
  return (
    <>
      <DatePickerControl>
        <DatePickerInput />
        <DatePickerTrigger />
      </DatePickerControl>

      <Portal>
        <DatePickerPositioner>
          <DatePickerContent>
            <DayView />
            <MonthView />
            <YearView />
          </DatePickerContent>
        </DatePickerPositioner>
      </Portal>
    </>
  );
}
