import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import PetWeightPage from './index';
import UploadImage from '../../../components/UploadImage';
import RangeSlider from '../../../components/RangeSlider';
import TextInput from '../../../components/TextInput';
import RadioButton from '../../../components/RadioButton';
import Button from '../../../components/Button';

let instance;

vi.mock('../../../components/UploadImage', () => ({
  __esModule: true,
  default: vi.fn().mockImplementation(() => ({
    mount: vi.fn(),
    selected: {
      get: vi.fn().mockReturnValue({
        classList: {
          add: vi.fn(),
        },
      }),
    },
  })),
}));

vi.mock('../../../components/RangeSlider', () => ({
  __esModule: true,
  default: vi.fn().mockImplementation(() => ({
    mount: vi.fn(),
    setValue: vi.fn(),
    listen: vi.fn(),
    selected: {
      get: vi.fn().mockReturnValue({
        classList: {
          add: vi.fn(),
        },
      }),
    },
  })),
}));

vi.mock('../../../components/TextInput', () => ({
  __esModule: true,
  default: vi.fn().mockImplementation(() => ({
    mount: vi.fn(),
    setValue: vi.fn(),
    listen: vi.fn(),
    selected: {
      get: vi.fn().mockReturnValue({
        classList: {
          add: vi.fn(),
        },
      }),
    },
  })),
}));

vi.mock('../../../components/RadioButton', () => ({
  __esModule: true,
  default: vi.fn().mockImplementation(() => ({
    mount: vi.fn(),
    isChecked: vi.fn().mockImplementation(function isChecked() {
      return this === instance.radioKG;
    }),
    getValue: vi.fn().mockImplementation(function getValue() {
      return this === instance.radioKG ? 'kg' : 'lb';
    }),
    selected: {
      get: vi.fn().mockReturnValue({
        classList: {
          add: vi.fn(),
        },
      }),
    },
  })),
}));

vi.mock('../../../components/Button', () => ({
  __esModule: true,
  default: vi.fn().mockImplementation(() => ({
    mount: vi.fn(),
    listen: vi.fn(),
    selected: {
      get: vi.fn().mockReturnValue({
        classList: {
          add: vi.fn(),
        },
      }),
    },
  })),
}));

const propsMock = {
  petPhoto: 'https://via.placeholder.com/150',
};

describe('PetWeightPage', () => {
  beforeEach(() => {
    instance = new PetWeightPage(propsMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('is a Function', () => {
    expect(PetWeightPage).toBeInstanceOf(Function);
  });

  it('returns an object', () => {
    expect(instance).toBeInstanceOf(Object);
  });

  it('initializes components correctly', () => {
    expect(UploadImage).toHaveBeenCalledTimes(1);
    expect(RangeSlider).toHaveBeenCalledTimes(1);
    expect(TextInput).toHaveBeenCalledTimes(1);
    expect(RadioButton).toHaveBeenCalledTimes(2);
    expect(Button).toHaveBeenCalledTimes(1);
  });

  it('sets the initial pet photo', () => {
    expect(UploadImage).toHaveBeenCalledWith();
  });

  it('updates weight correctly on slider change', () => {
    const mockValue = 5.0;
    instance.slider.listen.mock.calls[0][1](mockValue);
    expect(instance.weight).toBe(mockValue);
    expect(instance.input.setValue).toHaveBeenCalledWith(mockValue);
  });

  it('updates slider correctly on input change', () => {
    const mockValue = '5.0';
    instance.input.listen.mock.calls[0][1](mockValue);
    expect(instance.weight).toBe(parseFloat(mockValue));
    expect(instance.slider.setValue).toHaveBeenCalledWith(
      parseFloat(mockValue),
    );
  });

  it('emits weight and unit on button click', () => {
    const mockWeight = 5.0;
    instance.weight = mockWeight;
    instance.radioKG.isChecked = () => true;
    instance.radioKG.getValue = () => 'kg';
    const emitSpy = vi.spyOn(instance, 'emit');

    instance.button.listen.mock.calls[0][1]();

    expect(emitSpy).toHaveBeenCalledWith('weight', mockWeight, 'kg');
  });

  it('switches weight unit correctly', () => {
    instance.radioKG.isChecked = () => true;
    expect(instance.weightUnit()).toBe('kg');

    instance.radioKG.isChecked = () => false;
    instance.radioLB.isChecked = () => true;
    expect(instance.weightUnit()).toBe('lb');
  });

  it('applies CSS classes correctly', () => {
    expect(
      instance.image.selected.get('image-preview').classList.add,
    ).toHaveBeenCalledWith('pet-weight-page__image');
    expect(
      instance.slider.selected.get('range-slider').classList.add,
    ).toHaveBeenCalledWith('pet-weight-page__slider');
    expect(
      instance.slider.selected.get('range-slider-value').classList.add,
    ).toHaveBeenCalledWith('pet-weight-page__value');
    expect(
      instance.input.selected.get('input-text').classList.add,
    ).toHaveBeenCalledWith('pet-weight-page__input');
    expect(
      instance.input.selected.get('input-text-container').classList.add,
    ).toHaveBeenCalledWith('pet-weight-page__input-container');
    expect(
      instance.radioKG.selected.get('radio-container').classList.add,
    ).toHaveBeenCalledWith('pet-weight-page__radio');
    expect(
      instance.radioLB.selected.get('radio-container').classList.add,
    ).toHaveBeenCalledWith('pet-weight-page__radio');
    expect(
      instance.button.selected.get('button').classList.add,
    ).toHaveBeenCalledWith('pet-weight-page__button');
  });
});
