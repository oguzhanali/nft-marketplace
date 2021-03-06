import React, { useState, Dispatch } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { create } from '../../api/methods'
import Loader from '../../theme/loader'
import { IUser } from '../../types/user'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

enum AssetCategory {
  art = 'art',
  celebrities = 'celebrities',
  gaming = 'gaming',
  sport = 'sport',
  music = 'music',
  crypto = 'crypto',
}

type Inputs = {
  image: File[]
  title: string
  endTime: Date
  creator: string
  category: AssetCategory
}

export default function UploadModal({ setIsOpen }: { setIsOpen: Dispatch<boolean> }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>()
  const [loading, setLoading] = useState(false)
  const stored = window.localStorage.getItem('user')
  const user: IUser = stored && JSON.parse(stored)
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)

    try {
      const form = new FormData()

      const file = data.image[0]
      form.append('image', file)
      form.append('title', data.title)
      form.append('category', data.category)
      form.append('endTime', data.endTime.toISOString())
      form.append('creator', data.creator)

      await create(form)

      setIsOpen(false)
    } catch (error) {
      if (error instanceof Error) window.alert(error.message)
    } finally {
      setLoading(false)
    }
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="image">
            Image
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            aria-describedby="image_help"
            id="image"
            type="file"
            // name="image"
            {...register('image', { required: true })}
            required
          />
          {errors.image && <span className="text-red-500 text-sm">Image file is required</span>}
          <p className="mt-1 text-sm text-gray-500 " id="image_help">
            SVG, PNG, JPG or GIF
          </p>
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="KingCrypto etc."
          {...register('title', { required: true })}
          required
        />
        {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
      </div>
      <div className="mb-6">
        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 ">
          Category
        </label>
        <select
          required
          {...register('category', { required: true })}
          id="category"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
          <option value={''}>Select a category</option>
          <option value="art">Art</option>
          <option value="celebrities">Celebrities</option>
          <option value="gaming">Gaming</option>
          <option value="sport">Sport</option>
          <option value="music">Music</option>
          <option value="crypto">Crypto</option>
        </select>
        {errors.category && <span className="text-red-500 text-sm">Category is required</span>}
      </div>
      <div className="mb-6">
        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 ">
          End Time
        </label>
        <Controller
          control={control}
          name="endTime"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <ReactDatePicker
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
              required
              placeholderText="Select a date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          )}
        />
        {errors.endTime && <span className="text-red-500 text-sm">End time is required</span>}
      </div>
      <input type="hidden" value={user.address} {...register('creator', { required: true })} />

      {loading ? (
        <Loader />
      ) : (
        <input
          type="submit"
          className="cursor-pointer w-full flex items-center justify-center whitespace-nowrap font-bold border-2 border-primary rounded-full h-12 px-8 text-md bg-primary text-white hover:border-indigo-700 hover:bg-indigo-700"
        />
      )}
    </form>
  )
}
