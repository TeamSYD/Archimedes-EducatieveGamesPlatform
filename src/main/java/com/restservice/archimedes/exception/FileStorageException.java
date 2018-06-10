package com.restservice.archimedes.exception;

/**
 * Created by dahir on Tue 05-06-18.
 */
public class FileStorageException extends RuntimeException {
    public FileStorageException(String message) {
        super(message);
    }

    public FileStorageException(String message, Throwable cause) {
        super(message, cause);
    }
}
