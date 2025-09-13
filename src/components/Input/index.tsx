"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
// import './input.scss';
import styles from './input.module.css';
import Multiselect from 'multiselect-react-dropdown';
import PhoneNumberInput from './PhoneNumberInput';
import Image from 'next/image';
import { icons } from '@/assets';
// import { icons } from '../../assets';

interface IInput {
  pattern?: string;
  type?: string;
  label?: string;
  ctaText?: string;
  ctaRoute?: string;
  obscureText?: boolean;
  onChange?: (name: string, value: string) => void;
  hasError?: boolean;
  errorText?: string;
  readonly?: boolean;
  placeholder?: string;
  name: string;
  value: string;
  required?: boolean;
  onBlur?: () => void;
  defaultValue?: string;
  handleCTAClick?: () => void;
  info?: string;
  accept?: string;
  min?: number;
  maxLength?: number;
  id?: string;
  disabled?: boolean;
  className?: string;
  icon?: string;
}


function Input(props: IInput) {
  const [inputType, setType] = useState(props.type || 'text');
  const isPassword = inputType === 'password';
  const handleViewPassword = (event: any) => {
    event.preventDefault();
    if (isPassword) {
      setType('text')
    } else {
      setType('password');
    }
  }

  return (
    <div className={`${styles["input-wrapper"]} ${props.className}`}>
      <InputLabel props={props} />
      {props.type === 'password' && (
        <button onClick={handleViewPassword} className={styles["open-password"]}>
          <span>{isPassword ? 'Show' : 'Hide'}</span>
        </button>
      )
      }
      {
        props.icon && (
          <Image src={props.icon} width={18} height={18} alt="input icon" className='absolute top-[55%] left-3' />
        )
      }
      {
        props.type && props.type === 'file' ? (
          <input
            type="file"
            required={props.required}
            onChange={({ target }) => {
              //@ts-ignore
              props.onChange && props.onChange(props.name, target.files[0])
            }}
            onBlur={() => {
              props.onBlur && props.onBlur()
            }}
            accept={props.accept}
            style={{
              backgroundColor: 'transparent',
            }}
            id={props.id}
          />
        ) : props.type === "tel" ?
          (
            <PhoneNumberInput
              height={"12"}
              value={props.value}
              required={props.required}
              handleChange={(e) => {
                props.onChange && props.onChange(props.name, e.target.value);
              }}
              onBlur={() => {
                props.onBlur && props.onBlur()
              }}
              min={props.min}
              name={props.name}
              pattern={props.pattern || '.*?'}
              readOnly={props.readonly}
              defaultValue={props.defaultValue}
            />
          )
          : props.maxLength ? (
            <textarea
              defaultValue={props.defaultValue}
              placeholder={props.placeholder}
              name={props.name}
              value={props.value}
              required={props.required}
              onChange={({ target }) => {
                props.onChange && props.onChange(props.name, target.value);
              }}
              onBlur={() => {
                props.onBlur && props.onBlur()
              }}
              className='!py-2 !resize-none !h-20 !mt-0'
              rows={10}
              maxLength={props.maxLength}
              disabled={props.disabled}
            >

            </textarea>
          ) : (
            <input
              type={inputType}
              readOnly={props.readonly}
              defaultValue={props.defaultValue}
              placeholder={props.placeholder}
              name={props.name}
              value={props.value}
              required={props.required}
              pattern={props.pattern || '.*?'}
              onChange={({ target }) => {
                props.onChange && props.onChange(props.name, target.value)
              }}
              onBlur={() => {
                props.onBlur && props.onBlur()
              }}
              min={props.min}
              id={props.id}
              disabled={props.disabled}
              className={`${props.icon && "!pl-[40px]"}`}
            />
          )
      }
      {props.hasError && <p>{props.errorText}</p>}
      {props.maxLength ? <span className='self-end'>{props.value?.length || 0}/{props.maxLength}</span> : ''}
    </div>
  );
}

export default Input;

export const Select = ({
  data,
  value,
  ...props
}: {
  data: Array<string>;
  type?: string;
  value?: string;
  label?: string;
  ctaText?: string;
  ctaRoute?: string;
  obscureText?: boolean;
  onChange?: (name: string, value: string) => void;
  hasError?: boolean;
  errorText?: string;
  readonly?: boolean;
  placeholder?: string;
  name: string;
  required?: boolean;
  onBlur?: () => void;
  defaultValue?: string;
  className?: string;
  selectClassName?: string;
  info?: string;
  icon?: string;
}) => {
  return (
    <div className={`${styles['input-wrapper']} ${props.className}`}>
      <InputLabel props={props} />
      {
        props.icon && (
          <Image src={props.icon} width={18} height={18} alt="input icon" className={`absolute left-3 ${props.label ? "top-[55%]" : "top-[35%]"}`} />
        )
      }
      <select
        className={`${props.selectClassName} ${props.icon && "!pl-[40px]"}`}
        name={props.name}
        value={value}
        required={props.required}
        onChange={({ target }) => {
          props.onChange && props.onChange(props.name, target.value)
        }}
        onBlur={() => {
          props.onBlur && props.onBlur()
        }}
      >
        <option disabled></option>
        {
          data && data.map((item, index) => <option value={item} key={`${item}-${index}}`}>{item}</option>)
        }
      </select>
      {props.hasError && <p>{props.errorText}</p>}
    </div>
  )
}

export const AdvancedSelect = ({
  data,
  value,
  ...props
}: {
  data: Array<{
    label: string,
    value: string | number
  }>;
  type?: string;
  value?: string;
  label?: string;
  ctaText?: string;
  ctaRoute?: string;
  obscureText?: boolean;
  onChange?: (name: string, value: string) => void;
  hasError?: boolean;
  errorText?: string;
  readonly?: boolean;
  placeholder?: string;
  name: string;
  required?: boolean;
  onBlur?: () => void;
  defaultValue?: string;
  className?: string;
  selectClassName?: string;
  info?: string;
}) => {
  return (
    <div className={`${styles['input-wrapper']} ${props.className}`}>
      <InputLabel props={props} />
      <select
        className={`${props.selectClassName}`}
        name={props.name}
        value={value}
        required={props.required}
        onChange={({ target }) => {
          props.onChange && props.onChange(props.name, target.value)
        }}
        onBlur={() => {
          props.onBlur && props.onBlur()
        }}
      >
        <option disabled>{props.placeholder}</option>
        {
          data && data.map((item, index) => <option value={item.value} key={`${item.value}-${index}}`}>{item.label}</option>)
        }
      </select>
      {props.hasError && <p>{props.errorText}</p>}
    </div>
  )
}

export const CustomMultiSelect = ({
  data,
  value,
  ...props
}: {
  data: Array<{
    label: string,
    value: string | number
    chipBg?: string
  }>;
  type?: string;
  value?: Array<string>;
  label?: string;
  ctaText?: string;
  ctaRoute?: string;
  obscureText?: boolean;
  onChange?: (name: string, value: string) => void;
  hasError?: boolean;
  errorText?: string;
  readonly?: boolean;
  placeholder?: string;
  name: string;
  required?: boolean;
  onBlur?: () => void;
  defaultValue?: string;
  className?: string;
  selectClassName?: string;
  info?: string;
}) => {
  return (
    <div className={`${styles['input-wrapper']} ${props.className}`}>
      <InputLabel props={props} />
      <div className="w-[100%] [&>*]:w-[100%] p-0 ">
        <Multiselect
          selectedValues={() => value?.map(i => { return { label: i, value: i } })}
          options={data} // Options to display in the dropdown
          onSelect={(selectedList) => {
            props.onChange && props.onChange(props.name, selectedList.map((i: any) => i.value))
          }} // Function will trigger on select event
          onRemove={(selectedList) => {
            props.onChange && props.onChange(props.name, selectedList.map((i: any) => i.value))
          }} // Function will trigger on remove event
          displayValue="label" // Property name to display in the dropdown options
          placeholder={props.placeholder}
          avoidHighlightFirstOption={true}
          showArrow={true}
          closeIcon="cancel"
          style={{
            chips: { // To change css chips(Selected options)
              background: "#F55F64",
              color: "white",
              margin: "5px",
              borderRadius: "20px"
            },
            searchBox: {
              padding: "0"
            },
          }}
        />
      </div>
    </div>
  )
}


export const InputLabel = ({ props }: any) => {
  const [openInfo, setOpenInfo] = useState(false);
  return (
    <div className={styles['label-wrapper']}>
      {props.label && <label htmlFor={props.name}>{props.label} {props.required && (<sup className='text-red-500 font-bold'>*</sup>)}</label>}
      <Link href={`/${props.ctaRoute}`}><span>{props.ctaText}</span></Link>
      {props.info && <img className='open-info w-4 h-4' src={icons.help} alt="" onMouseOver={() => setOpenInfo(true)} onMouseLeave={() => setOpenInfo(false)} />}
      {props.info && openInfo && <div className={styles["info"]}>{props.info}</div>}
    </div>
  )
}
