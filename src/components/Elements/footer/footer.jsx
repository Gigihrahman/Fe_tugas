import { ImFacebook2 } from 'react-icons/im'
import { GrInstagram } from 'react-icons/gr'
import { FaTiktok } from 'react-icons/fa'

export const Footer = () => {
  return (
    <footer class="bg-white rounded-3xl shadow-2xl dark:bg-gray-900 m-4  ">
      <div class=" w-100% mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://www.instagram.com/ngado.kado/"
            class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="../../../../public/images/logo.png"
              class="h-8"
              alt="Flowbite Logo"
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Ngado Kado
            </span>
          </a>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li className="flex flex-wrap">
              <ImFacebook2 />
              <a
                href="https://www.facebook.com/Ngado.kado"
                class="hover:underline me-4 md:me-6 px-3"
              >
                Facebook
              </a>
            </li>
            <li className="flex flex-wrap">
              <GrInstagram />
              <a
                href="https://www.instagram.com/ngado.kado/"
                class="hover:underline me-4 md:me-6 px-3"
              >
                Instagram
              </a>
            </li>
            <li className="flex flex-wrap">
              <FaTiktok />
              <a
                href="https://www.tiktok.com/@ngado.kado"
                class="hover:underline me-4 md:me-6 px-3"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{' '}
          <a href="https://flowbite.com/" class="hover:underline">
            Ngado Kado 
          </a>
         
        </span>
      </div>
    </footer>
  )
}
