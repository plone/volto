The following terminal session commands use `bash` for the shell.
Adapt them for your flavor of shell.

```{seealso}
See the [`nvm` install and update script documentation](https://github.com/nvm-sh/nvm#install--update-script).
For the `fish` shell, see [`nvm.fish`](https://github.com/jorgebucaran/nvm.fish).
```

1.  Create your shell profile, if it does not exist.

    ```shell
    touch ~/.bash_profile
    ```

2.  Download and run the `nvm` install and update script, and pipe it into `bash`.

    ```shell
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.39.5/install.sh | bash
    ```

3.  Source your profile.
    Alternatively close the session and open a new one.

    ```shell
    source ~/.bash_profile
    ```

4.  Verify that the `nvm` version is that which you just installed or updated:

    ```shell
    nvm --version
    ```
