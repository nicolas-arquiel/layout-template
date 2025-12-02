import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, CheckSquare, MessageSquare, Mail, Calendar } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const BreadCrumbs = ({ data, title, dropDown }) => {
  const VITE_APP_ABR_BASENAME = import.meta.env.VITE_APP_ABR_BASENAME || 'Mi Proyecto';

  const renderBreadCrumbs = () => {
    return data.map((item, index) => {
      const Wrapper = item.link ? Link : Fragment;
      const isLastItem = data.length - 1 === index;
      
      return (
        <li key={index} className="inline-flex items-center">
          <Wrapper {...(item.link ? { to: item.link } : {})}>
            <span className={isLastItem ? 'breadcrumbs-current' : 'breadcrumbs-link'}>
              {item.title}
            </span>
          </Wrapper>
          {!isLastItem && (
            <span className="mx-1 text-gray-400 text-sm font-light opacity-60 select-none">/</span>
          )}
        </li>
      );
    });
  };

  return (
    <div className="w-full mb-7 py-5 border-b border-gray-100">
      <div className="grid grid-cols-12 gap-6 items-center">
        {/* Left side - Breadcrumbs */}
        <div className="col-span-12 md:col-span-9">
          {title && (
            <h2 className="breadcrumbs-title">
              {title}
            </h2>
          )}
          <nav className="hidden sm:block" aria-label="Breadcrumb">
            <ol className="breadcrumbs-list">
              <li className="inline-flex items-center">
                <Link to="/inicio" className="breadcrumbs-link">
                  {VITE_APP_ABR_BASENAME}
                </Link>
                <span className="mx-1 text-gray-400 text-sm font-light opacity-60 select-none">/</span>
              </li>
              {renderBreadCrumbs()}
            </ol>
          </nav>
        </div>
        
        {/* Right side - Dropdown */}
        {dropDown && (
          <div className="col-span-12 md:col-span-3 flex justify-start md:justify-end items-center mt-3 md:mt-0">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  className="breadcrumbs-dropdown-trigger"
                  aria-label="Open menu"
                >
                  <Grid size={16} />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="breadcrumbs-dropdown-content"
                  sideOffset={5}
                  align="end"
                >
                  <DropdownMenu.Item asChild>
                    <Link to="/apps/todo" className="breadcrumbs-dropdown-item">
                      <CheckSquare size={16} />
                      <span>Todo</span>
                    </Link>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item asChild>
                    <Link to="/apps/chat" className="breadcrumbs-dropdown-item">
                      <MessageSquare size={16} />
                      <span>Chat</span>
                    </Link>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item asChild>
                    <Link to="/apps/email" className="breadcrumbs-dropdown-item">
                      <Mail size={16} />
                      <span>Email</span>
                    </Link>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item asChild>
                    <Link to="/apps/calendar" className="breadcrumbs-dropdown-item">
                      <Calendar size={16} />
                      <span>Calendar</span>
                    </Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        )}
      </div>
    </div>
  );
};

BreadCrumbs.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      title: PropTypes.string.isRequired
    })
  ),
  dropDown: PropTypes.bool
};

BreadCrumbs.defaultProps = {
  data: [],
  dropDown: false
};

export default BreadCrumbs;
