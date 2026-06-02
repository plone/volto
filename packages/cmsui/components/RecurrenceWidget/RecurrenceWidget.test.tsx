import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecurrenceWidget } from './RecurrenceWidget';

const Widget = RecurrenceWidget as React.ComponentType<any>;

const { mockRruleStr, mockGetRruleText } = vi.hoisted(() => ({
  mockRruleStr: vi.fn(),
  mockGetRruleText: vi.fn(),
}));

let mockFormContext: any = { recurrence: null };

vi.mock('jotai', () => ({
  atom: vi.fn(),
  useAtomValue: () => mockFormContext,
}));

vi.mock('../../routes/atoms', () => ({
  formAtom: Symbol('formAtom'),
}));

vi.mock('./rrule', () => ({
  rrulestr: mockRruleStr,
}));

vi.mock('./utils', () => ({
  getRruleText: mockGetRruleText,
}));

vi.mock('react-aria-components', () => ({
  DialogTrigger: ({ children, isOpen }: any) => {
    const childrenArray = Array.isArray(children) ? children : [children];
    return (
      <div data-testid="dialog-trigger" data-open={String(isOpen)}>
        {childrenArray[0]}
        {isOpen && childrenArray[1]}
      </div>
    );
  },
  Group: ({ children }: any) => <div>{children}</div>,
}));

vi.mock('../Field/Field', () => ({
  Label: ({ children }: any) => <label>{children}</label>,
}));

vi.mock('@plone/components/icons/edit.svg?react', () => ({
  default: () => <svg data-testid="edit-icon" />,
}));

vi.mock('@plone/components/icons/bin.svg?react', () => ({
  default: () => <svg data-testid="delete-icon" />,
}));

vi.mock('@plone/components/quanta', () => ({
  Button: ({ children, onClick, onPress }: any) => (
    <button onClick={onClick ?? onPress}>{children}</button>
  ),
}));

vi.mock('./Components/RecurrenceWidgetModal', () => ({
  default: ({ onSave, setIsModalOpen }: any) => (
    <div data-testid="recurrence-modal">
      <button
        data-testid="modal-save"
        onClick={() => onSave('RRULE:FREQ=WEEKLY')}
      >
        Save
      </button>
      <button data-testid="modal-close" onClick={() => setIsModalOpen(false)}>
        Close
      </button>
    </div>
  ),
}));

vi.mock('./Components/SelectedDates', () => ({
  default: ({ rruleDates }: any) => (
    <div data-testid="selected-dates">{rruleDates.length} dates</div>
  ),
}));

const RRULE_STRING = 'RRULE:FREQ=WEEKLY;BYDAY=MO';

describe('RecurrenceWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFormContext = { recurrence: null };
    mockRruleStr.mockReturnValue({ all: vi.fn(() => []) });
    mockGetRruleText.mockReturnValue(undefined);
  });

  describe('rendering', () => {
    it('renders without crashing when there is no recurrence', () => {
      expect(() => render(<Widget />)).not.toThrow();
    });

    it('renders label when prop is provided', () => {
      render(<Widget label="Recurrence" />);
      expect(screen.getByText('Recurrence')).toBeInTheDocument();
    });

    it('does not render label when prop is absent', () => {
      const { container } = render(<Widget />);
      expect(container.querySelector('label')).toBeNull();
    });

    it('always renders edit and delete buttons', () => {
      render(<Widget />);
      expect(screen.getAllByRole('button')).toHaveLength(2);
    });
  });

  describe('delete button', () => {
    it('calls onChange with null when clicked', () => {
      const onChange = vi.fn();
      render(<Widget onChange={onChange} />);
      const [, deleteButton] = screen.getAllByRole('button');
      fireEvent.click(deleteButton);
      expect(onChange).toHaveBeenCalledWith(null);
    });

    it('does not throw when clicked without onChange', () => {
      render(<Widget />);
      const [, deleteButton] = screen.getAllByRole('button');
      expect(() => fireEvent.click(deleteButton)).not.toThrow();
    });

    it('does not call onChange when edit button is clicked', () => {
      const onChange = vi.fn();
      render(<Widget onChange={onChange} />);
      const [editButton] = screen.getAllByRole('button');
      fireEvent.click(editButton);
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('modal', () => {
    it('is closed on initial render', () => {
      render(<Widget />);
      expect(screen.getByTestId('dialog-trigger')).toHaveAttribute(
        'data-open',
        'false',
      );
      expect(screen.queryByTestId('recurrence-modal')).not.toBeInTheDocument();
    });

    it('opens when edit button is clicked', () => {
      render(<Widget />);
      const [editButton] = screen.getAllByRole('button');
      fireEvent.click(editButton);
      expect(screen.getByTestId('dialog-trigger')).toHaveAttribute(
        'data-open',
        'true',
      );
      expect(screen.getByTestId('recurrence-modal')).toBeInTheDocument();
    });

    it('calls onChange with the rrule string when modal saves', () => {
      const onChange = vi.fn();
      render(<Widget onChange={onChange} />);
      const [editButton] = screen.getAllByRole('button');
      fireEvent.click(editButton);
      fireEvent.click(screen.getByTestId('modal-save'));
      expect(onChange).toHaveBeenCalledWith('RRULE:FREQ=WEEKLY');
    });

    it('does not throw on modal save when onChange is not provided', () => {
      render(<Widget />);
      const [editButton] = screen.getAllByRole('button');
      fireEvent.click(editButton);
      expect(() =>
        fireEvent.click(screen.getByTestId('modal-save')),
      ).not.toThrow();
    });

    it('closes when setIsModalOpen(false) is called from modal', () => {
      render(<Widget />);
      const [editButton] = screen.getAllByRole('button');
      fireEvent.click(editButton);
      expect(screen.getByTestId('recurrence-modal')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('modal-close'));
      expect(screen.queryByTestId('recurrence-modal')).not.toBeInTheDocument();
      expect(screen.getByTestId('dialog-trigger')).toHaveAttribute(
        'data-open',
        'false',
      );
    });
  });

  describe('recurrence display', () => {
    it('does not show rrule text when recurrence is null', () => {
      mockGetRruleText.mockReturnValue('every week');
      render(<Widget />);
      expect(screen.queryByText('every week')).not.toBeInTheDocument();
    });

    it('does not show SelectedDates when recurrence is null', () => {
      render(<Widget />);
      expect(screen.queryByTestId('selected-dates')).not.toBeInTheDocument();
    });

    it('shows rrule text when recurrence is set', () => {
      mockFormContext = { recurrence: RRULE_STRING };
      mockGetRruleText.mockReturnValue('every week on Monday');
      render(<Widget />);
      expect(screen.getByText('every week on Monday')).toBeInTheDocument();
    });

    it('shows SelectedDates when recurrence produces dates', () => {
      const dates = [new Date('2025-01-06'), new Date('2025-01-13')];
      mockFormContext = { recurrence: RRULE_STRING };
      mockRruleStr.mockReturnValue({ all: vi.fn(() => dates) });
      render(<Widget />);
      expect(screen.getByTestId('selected-dates')).toBeInTheDocument();
      expect(screen.getByText('2 dates')).toBeInTheDocument();
    });

    it('does not show SelectedDates when recurrence produces no dates', () => {
      mockFormContext = { recurrence: RRULE_STRING };
      mockRruleStr.mockReturnValue({ all: vi.fn(() => []) });
      render(<Widget />);
      expect(screen.queryByTestId('selected-dates')).not.toBeInTheDocument();
    });

    it('passes the recurrence string to rrulestr', () => {
      mockFormContext = { recurrence: RRULE_STRING };
      render(<Widget />);
      expect(mockRruleStr).toHaveBeenCalledWith(RRULE_STRING);
    });

    it('passes the parsed rrule object to getRruleText', () => {
      const mockRrule = { all: vi.fn(() => []) };
      mockFormContext = { recurrence: RRULE_STRING };
      mockRruleStr.mockReturnValue(mockRrule);
      render(<Widget />);
      expect(mockGetRruleText).toHaveBeenCalledWith(mockRrule);
    });

    it('does not call rrulestr when recurrence is null', () => {
      render(<Widget />);
      expect(mockRruleStr).not.toHaveBeenCalled();
    });

    it('passes null to getRruleText when recurrence is null', () => {
      render(<Widget />);
      expect(mockGetRruleText).toHaveBeenCalledWith(null);
    });
  });
});
